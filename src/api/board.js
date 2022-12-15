import axios from 'axios';
const REG_ID = 'test';

/** 목록 조회 */
export async function fetchNoticeList(params) {
	return await axios.get('/system/eOrderNotice/eOrderNoticeListData', {
		params: params,
	});
}
/** 상세 조회 */
export function fetchNoticeDetail(noticeNo) {
	return axios.get('/system/eOrderNotice/eOrderNoticeDetailData', {
		params: { noticeNo: noticeNo },
	});
}

// application/x-www-form-urlencoded
// `title=${title}`,
// application/json
// { pointCount: 10, offsetData: 1 }

/** 저장 */
export function saveNotice(strParam) {
	return axios.post('/system/eOrderNotice/eOrderNoticeSaveData', strParam);
}

/** 삭제 */
export function deleteNotice(noticeNo) {
	return axios.post(
		'/system/eOrderNotice/eOrderNoticeDeleteData',
		// { regId: REG_ID, noticeNo: noticeNo },
		`regId=${REG_ID}&noticeNo=${noticeNo}`,
	);
}
