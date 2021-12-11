import { createStore } from 'vuex';

// There can only be a single store for an application but you can have multiple states
const store = createStore({
    state() {
        return {
            foobar: 0
        }
    }
});

export default store;