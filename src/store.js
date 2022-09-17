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
        setDonutSegments(state, donutSegments) {
            state.donutSegments = donutSegments;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit mutations and can contain
     * arbitrary asynchronous operations. Its good practice to put actions between components. Actions are triggered
     * with the `store.dispatch` method.
     */
    actions: {
        async login(context, {email, password}) {
            try {
                const user = await Auth.signIn(email, password);
                const info = {
                    email: user.attributes.email,
                    name: user.attributes.name,
                    picture: user.attributes.picture,
                    username: user.attributes.preferred_username
                }

                context.commit('setUserInfo', info);
                context.commit('setAuthenticated', true);
                router.push('/dashboard');

                /*let userInfo = await Auth.currentUserInfo();
                userInfo = userInfo.then(result => result.data);*/
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
                    router.push('/login');
                } catch (err) {
                    console.log('There was an error signing out: ', err);
                }
            }
        },
        async getInventory({commit, dispatch, state}) {
            if (!state.inventory.length) {
                commit('setLoadStatus', true);

                try {
                    const response = await fetch(process.env.VUE_APP_API_URL);
                    const responseData = await response.json();
                    commit('setInventory', responseData.data);
                    dispatch('calcDonutSegments', state.inventory);
                    commit('setLoadStatus', false);
                } catch(err) {
                    console.error(err);
                    throw err;
                }
            }

        },
        calcDonutSegments({commit, state}, payload) {
            let segmentLabels = [];
            let segmentTotals = [];

            // Search through all the formats and collect them
            payload.forEach(segmentLabel => segmentLabels.push(segmentLabel['format']));
            // Store all the unique values (Set() returns an object)
            segmentLabels = new Set(segmentLabels);
            // Convert object to an array and sort values in alpha order
            segmentLabels = Array.from(segmentLabels).sort();
            //console.log(`Segment Labels: ${segmentLabels}`);

            // Tally up numbers with prop 'format'
            segmentLabels.forEach(label => {
                segmentTotals.push(state.inventory.filter(item => item['format'] === label).length);
            });
            //console.log(`Segment Totals: ${segmentTotals}`);
            commit('setDonutSegments', segmentTotals);
        }
    },
    /**
     * Think of them as computed properties for stores because sometimes we need to "compute" derived state based
     * on store state. A good example is all the repeat code you created in components to get inventory count.
     * When you `console.log()` the mutated data you will see a Proxy object, this is VueJS magic but don't
     * fret as you can use the mutation as normal. You noticed when you `console.log(state.inventory)`.
     */
    getters: {
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