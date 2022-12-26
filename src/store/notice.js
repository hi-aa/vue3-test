import api from '@/api/notice';
import { defineStore } from 'pinia';

export const useNoticeStore = defineStore('notice', {
	state: () => ({
		items: [],
		count: 0,
	}),
	getters: {},
	actions: {
		getNoticeList(params) {
			api.fetchNoticeList(params).then(response => {
				const { data } = response;
				this.items = data.data.list.map(item => {
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

				this.count = data.data.totCnt;
			});
		},
	},
});
