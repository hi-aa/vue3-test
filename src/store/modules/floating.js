export default {
	namespaced: true,
	state: {
		show: false,
		icon: 'plus',
		func: () => {
			// 함수를 여기서 이렇게 써도 되는지 모르겠음..
			console.log('default');
		},
	},
	getters: {},
	actions: {
		setFloatingButton({ commit }, payload = false) {
			commit('setShowState', payload);
		},
		setFloatingIcon({ commit }, payload) {
			commit('setIconState', payload);
		},
		setFloatingFunc({ commit }, payload) {
			commit('setFuncState', payload);
		},
	},
	mutations: {
		setShowState(state, value) {
			state.show = value;
		},
		setIconState(state, value) {
			state.icon = value;
		},
		setFuncState(state, value) {
			state.func = value;
		},
	},
};
