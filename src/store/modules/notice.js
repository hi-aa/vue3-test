import api from '@/api/board';

// front-end 컴포넌트간의(<<) 데이터/상태 공유를 편하게 하기위해 상태관리 라이브러리를 사용함
// ex) 장바구니 아이템 정보: 아이템 변경, 수량 변경 등등등
// 그럼 상세 페이지에 item 단건 가지고 있는건 굳이 여기서 관리할 필요까진 없는건가?

export default {
	namespaced: true,
	state: {
		// state: 읽기전용, 단순 조회 시 state에서 값 가져오기
		items: [],
		count: 0,
		item: {},
	},
	getters: {
		// getter: state 값을 이용해서 계산할 것이 있으면 getter로 구현
		// array 필터링, 숫자 계산 등등 쓰는듯
		// ex) 장바구니 totalCount 계산
		// noticeList: state => {
		// 	return state.items;
		// },
	},
	actions: {
		// action: 비동기 작업을 처리함, mutations을 실행시킴
		// context.state, context.getters
		// context.commit : mutation 실행
		// context.dispatch: 다른 action 실행
		getNoticeList({ commit }, payload) {
			api.fetchNoticeList(payload).then(response => {
				commit('setNoticeList', response); // mutation 실행
			});
		},
		getNotice({ commit }, payload) {
			api.fetchNoticeDetail(payload).then(response => {
				commit('setNotice', response);
			});
		},
	},
	mutations: {
		// mutations: state value 변경
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
					regNm,
					regDt,
				}) => ({
					compCd,
					noticeNo,
					title,
					contents,
					noticeYn,
					hitCnt,
					regNm,
					regDt,
				}))(item);
			});

			state.count = data.data.totCnt;
		},
		setNotice(state, response) {
			state.item = { ...response.data.data };
		},
	},
};
