import notice from '@/api/board';

export default {
	namespaced: true,
	state: {
		// 읽기전용
		items: [],
		count: 0,
	},
	getters: {
		// noticeList: state => {
		// 	return state.items;
		// },
	},
	// api 호출
	actions: {
		getNoticeList({ commit }, payload) {
			notice.fetchNoticeList(payload).then(response => {
				console.log(response);
				commit('setNoticeList', response); // mutation 실행
			});
		},
	},
	// state 변경
	mutations: {
		setNoticeList(state, response) {
			const { data } = response;
			state.items = data.data.list.map(item => {
				return (({
					compCd,
					noticeNo,
					title,
					contents,
					noticeYn,
					hitCnt,
					regDt,
				}) => ({
					compCd,
					noticeNo,
					title,
					contents,
					noticeYn,
					hitCnt,
					regDt,
				}))(item);
			});

			state.count = data.data.totCnt;
		},
	},
};
