import { createStore } from 'vuex';

/**
 * "There Can Be Only One", store for an application. But you can have multiple states
 * @todo Once code starts getting out of hand consider splitting the store into modules
 */
const store = createStore({
    state() {
        return {
            donutSegments: [],
            inventory: [],
            loadStatus: false
        }
    },
    /**
     * The only way to change a state in a store is to use mutations, and you can't call them directly. You'll
     * have to call `store.commit(mutationHandler)`. You can also pass additional arguments to `store.commit`,
     * these are called payload. Also, mutations are synchronous, you are not allowed to use asynchronous operations.
     */
    mutations: {
        setLoadStatus(state, status) {
            state.loadStatus = status;
        },
        setInventory(state, inventory) {
            state.inventory = inventory;
        },
        setDonutSegments(state, donutSegments) {
            state.donutSegments = donutSegments;
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit mutations and can contain
     * arbitrary asynchronous operations. Its good practice to put actions between components. Actions are triggered
     * with the `store.dispatch` method.
     */
    actions: {
        async getInventory({commit, dispatch, state}) {
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
        }
    }
});

export default store;