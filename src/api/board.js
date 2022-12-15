import axios from 'axios';
const REG_ID = 'test';
/** 목록 조회 */
const fetchNoticeList = async function (params) {
	return await axios.get('/system/eOrderNotice/eOrderNoticeListData', {
		params: params,
	});
};
/** 상세 조회 */
const fetchNoticeDetail = function (noticeNo) {
	return axios.get('/system/eOrderNotice/eOrderNoticeDetailData', {
		params: { noticeNo: noticeNo },
	});
};
/** 저장 */
const saveNotice = function (strParam) {
	return axios.post('/system/eOrderNotice/eOrderNoticeSaveData', strParam);
};
/** 삭제 */
const deleteNotice = function (noticeNo) {
	return axios.post(
		'/system/eOrderNotice/eOrderNoticeDeleteData',
		`regId=${REG_ID}&noticeNo=${noticeNo}`,
	);
};
export default {
	fetchNoticeList,
	fetchNoticeDetail,
	saveNotice,
	deleteNotice,
};
