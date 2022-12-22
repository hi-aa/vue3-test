export default {
	namespaced: true,
	state: {
		show: false,
	},
	getters: {},
	actions: {
		setLoading({ commit }, payload = false) {
			commit('setLoadingState', payload);
		},
	},
	mutations: {
		setLoadingState(state, value) {
			state.show = value;
		},
	},
};
