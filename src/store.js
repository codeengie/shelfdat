import { createStore } from 'vuex';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws/auth/config';
import router from './routes';
import logger from './utils/logger';

Amplify.configure(awsconfig);

/**
 * "There Can Be Only One", store for an application. But you can have multiple states
 * @todo Once code starts getting out of hand consider splitting the store into modules
 */
const store = createStore({
    state() {
        return {
            donutSegments: [],
            donutTypes: [],
            inventory: [],
            isAuthenticated: false,
            loadStatus: false,
            userInfo: {}
        }
    },
    /**
     * The only way to change a state in a store is to use mutations, and you can't call them directly. You'll
     * have to call `store.commit(mutationHandler)`. You can also pass additional arguments to `store.commit`,
     * these are called payload. Also, mutations are synchronous, you are not allowed to use asynchronous operations.
     */
    mutations: {
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
        },
        setLoadStatus(state, status) {
            state.loadStatus = status;
        },
        setInventory(state, inventory) {
            state.inventory = inventory;
        },
        setDonutTypes(state, donutTypes) {
            state.donutTypes = donutTypes;
        },
        setDonutSegments(state, donutSegments) {
            state.donutSegments = donutSegments;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        addInventoryItem(state, item) {
            state.inventory.push(item);
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit mutations and can contain
     * arbitrary asynchronous operations. Its good practice to put actions between components. Actions are triggered
     * with the `store.dispatch` method.
     */
    actions: {
        // Re-authenticate user if a valid access token exists and has not expired
        async reAuth({commit, dispatch}) {
            try {
                const session = await Auth.currentAuthenticatedUser();
                const userSession = session.signInUserSession.idToken;

                if (userSession.jwtToken) {
                    dispatch('userInfo', userSession.payload);
                    commit('setAuthenticated', true);
                }
            } catch(err) {
                logger('Re-auth failed. A valid token was not found.', err);
            }
        },
        // Retrieve user information from authentication
        userInfo({commit}, payload) {
            const userData =  {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                role: payload['cognito:groups'][0],
                username: payload.preferred_username
            }

            commit('setUserInfo', userData);
        },
        async login({commit, dispatch}, {email, password}) {
            commit('setLoadStatus', true);

            try {
                const user = await Auth.signIn(email, password);
                dispatch('userInfo', user.signInUserSession.idToken.payload);
                commit('setAuthenticated', true);
                commit('setLoadStatus', false);
                await router.push('/dashboard');

            } catch(err) {
                logger('There was an error authenticating user.', err);
            }
        },
        async logout({commit}) {
            if (this.state.isAuthenticated) {
                try {
                    await Auth.signOut();
                    // @todo Use vuex-extensions for reset or custom solution @link https://github.com/huybuidac/vuex-extensions
                    commit('setDonutSegments', []);
                    commit('setInventory', []);
                    commit('setUserInfo', {});
                    commit('setAuthenticated', false);
                    await router.push('/login');
                } catch (err) {
                    logger('There was an error logging out.', err);
                }
            }
        },
        async getInventory({commit, dispatch, state}) {
            if (!state.inventory.length) {
                const settings = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': (await Auth.currentSession()).getIdToken().getJwtToken()
                    }
                };

                commit('setLoadStatus', true);

                try {
                    const response = await fetch(process.env.VUE_APP_API_URL, settings);
                    const responseData = await response.json();

                    commit('setInventory', responseData.data);
                    dispatch('calcDonutLegend', {data: state.inventory, key: 'format', mutant:'setDonutSegments'});
                    dispatch('calcDonutLegend', {data: state.inventory, key: 'type', mutant: 'setDonutTypes'})
                    commit('setLoadStatus', false);
                } catch(err) {
                    logger('There was an error fetching inventory.', err);
                    throw err;
                }
            }

        },
        async addNewItem({commit}, payload) {
            commit('setLoadStatus', true);

            const settings = {
                method: 'POST',
                headers: {
                    'Authorization': (await Auth.currentSession()).getIdToken().getJwtToken()
                },
                body: payload
            };

            try {
                const response = await fetch(process.env.VUE_APP_API_URL, settings);
                const responseData = await response.json();

                // Update store with added item
                if (responseData.status === 'fulfilled') {
                    logger('Item successfully added to database', responseData.value, 'info');
                    commit('addInventoryItem', responseData.value);
                    commit('setLoadStatus', false);
                } else {
                    commit('setLoadStatus', false);
                    logger('Item was not added to database', responseData, 'error');
                }

            } catch(err) {
                logger('There was a problem adding a new item.', err);
                throw err;
            }
        },
        // Action cannot have multiple parameters e.g,. foobar(state, {payload, url})
        calcDonutLegend({commit, state}, payload) {
            let legendLabels = [];
            let legendTotals = [];

            // Use parameter as key to search through the data and collect it
            payload.data.forEach(legendLabel => legendLabels.push(legendLabel[payload.key]));
            // Store all the values (Set() returns an object)
            legendLabels = new Set(legendLabels);
            // Convert object to an array and sort values in alpha order
            legendLabels = Array.from(legendLabels).sort();
            // Tally up the numbers with key
            legendLabels.forEach(label => {
                legendTotals.push(state.inventory.filter(item => item[payload.key] === label).length);
            });

            commit(payload.mutant, legendTotals);
        }
    },
    /**
     * Think of them as computed properties for stores because sometimes we need to "compute" derived state based
     * on store state. A good example is all the repeat code you created in components to get inventory count.
     * When you `console.log()` the mutated data you will see a Proxy object, this is VueJS magic but don't
     * fret as you can use the mutation as normal. You noticed when you `console.log(state.inventory)`.
     */
    getters: {
        donutLegendData(state) {
            return state.donutTypes;
        },
        donutSegmentData(state) {
            return state.donutSegments;
        },
        inventoryData(state) {
            return state.inventory;
        },
        inventoryTotal(state) {
            return state.inventory.length;
        },
        loadStatus(state) {
            return state.loadStatus;
        },
        userInfo(state) {
            return state.userInfo;
        }
    }
});

export default store;