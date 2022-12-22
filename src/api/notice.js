// import axios from 'axios';
import { api } from '.';
const REG_ID = 'test';

/** 목록 조회 */
export function fetchNoticeList(params) {
	return api.get('/system/eOrderNotice/eOrderNoticeListData', {
		params: params,
	});
}
/** 상세 조회 */
export function fetchNoticeDetail(noticeNo) {
	return api.get('/system/eOrderNotice/eOrderNoticeDetailData', {
		params: { noticeNo: noticeNo, gubun: 'EOS' },
	});
}
/** 저장 */
export function saveNotice(strParam) {
	strParam += `&regId=${REG_ID}`;
	return api.patch('/system/eOrderNotice/eOrderNoticeSaveData', strParam);
}
/** 삭제 */
export function deleteNotice(noticeNo) {
	return api.post(
		'/system/eOrderNotice/eOrderNoticeDeleteData',
		`regId=${REG_ID}&noticeNo=${noticeNo}`,
	);
}
export default {
	fetchNoticeList,
	fetchNoticeDetail,
	saveNotice,
	deleteNotice,
};
