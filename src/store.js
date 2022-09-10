import { createStore } from 'vuex';

/**
 * "There Can Be Only One", store for an application. But you can have multiple states
 * @todo Once code starts getting out of hand consider splitting the store into modules
 */
const store = createStore({
    state() {
        return {
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
        }
    },
    /**
     * Actions are similar to mutations except instead of mutating state, actions commit mutations and can contain
     * arbitrary asynchronous operations. Its good practice to put actions between components. Actions are triggered
     * with the `store.dispatch` method.
     */
    actions: {
        async getInventory(context) {
            context.commit('setLoadStatus', true);

            const response = await fetch(process.env.VUE_APP_API_URL);
            const responseData = await response.json();

            /**
             * Necessary because fetch() doesn't throw an error
             * @todo You'll need a try/catch here...maybe
             */
            if (!response.ok) {
                console.log(responseData);
                throw new Error(responseData.message || `Failed to get inventory data: ${response.status}`);
            }

            console.log(responseData);
            context.commit('setInventory', responseData.data);
            context.commit('setLoadStatus', false);
        }
    },
    /**
     * Think of them as computed properties for stores because sometimes we need to "compute" derived state based
     * on store state. A good example is all the repeat code you created in components to get inventory count.
     * When you `console.log()` the mutated data you will see a Proxy object, this is VueJS magic but don't
     * fret as you can use the mutation as normal. You noticed when you `console.log(state.inventory)`.
     */
    getters: {
        // @todo Consolidate all the inventory counters you have in components
        inventoryData(state) {
            return state.inventory;
        },
        inventoryTotal(state) {
            return state.inventory.length;
        },
        loadStatus(state) {
            return state.loadStatus;
        }
    }
});

export default store;