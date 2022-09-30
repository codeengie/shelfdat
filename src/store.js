import { createStore } from 'vuex';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws/auth/config';
import router from './routes';

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
            isUserSession: false,
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
        setUserSession(state, session) {
            state.isUserSession = session;
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit mutations and can contain
     * arbitrary asynchronous operations. Its good practice to put actions between components. Actions are triggered
     * with the `store.dispatch` method.
     */
    actions: {
        async checkUserSession({commit, dispatch}) {
            try {
                const session = (await Auth.currentSession()).getIdToken().getJwtToken();
                const user = (await Auth.currentUserInfo());

                if (session) {
                    dispatch('getUserSession', user);
                    commit('setUserSession', true);
                    commit('setAuthenticated', true);
                }
            } catch(err) {
                console.log('There was an error with verifying session', err);
            }
        },
        getUserSession(context, payload) {
            const userData =  {
                email: payload.attributes.email,
                name: payload.attributes.name,
                picture: payload.attributes.picture,
                username: payload.attributes.preferred_username
            }

            context.commit('setUserInfo', userData);
        },
        async login({commit, dispatch}, {email, password}) {
            commit('setLoadStatus', true);

            try {
                const user = await Auth.signIn(email, password);
                dispatch('getUserSession', user);
                commit('setAuthenticated', true);
                commit('setLoadStatus', false);
                await router.push('/dashboard');

            } catch(err) {
                console.log('There was an error with the login', err);
            }
        },
        async logout(context) {
            if (this.state.isAuthenticated) {
                try {
                    await Auth.signOut();
                    context.commit('setDonutSegments', []);
                    context.commit('setInventory', []);
                    context.commit('setUserInfo', {});
                    context.commit('setAuthenticated', false);
                    await router.push('/login');
                } catch (err) {
                    console.log('There was an error signing out: ', err);
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
                    console.error(err);
                    throw err;
                }
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
        // @todo Consolidate all the inventory counters you have in components
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