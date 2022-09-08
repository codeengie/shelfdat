import { createStore } from 'vuex';

// There can only be a single store for an application, but you can have multiple states
const store = createStore({
    state() {
        return {
            collections: [],
            foobar: 0
        }
    },
    // The only way to change state in a store
    mutations: {
        foobar(state) {
            state.foobar++;
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit
     * mutations and can contain arbitrary asynchronous operations.
     */
    actions: {
        // You have the same name
        foobar(context) {
            context.commit('foobar'); // Action commits foobar
        }
    },
    // Think of them as computed properties for stores
    getters: {
        finalFoobar(state) {
            return state.foobar * 2;
        },
        normalizedFoobar(state) {
            const finalFoobar = state.counter * 3;

            if (finalFoobar < 0) {
                return 0;
            }
        },
        // @todo Consolidate all the inventory counters you have in components
        inventoryCount(state) {
            return state;
        }
    }
});

export default store;