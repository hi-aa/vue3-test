import axios from 'axios';
// const regId = 'test';

/** 목록 조회 */
export async function getNoticeList(params) {
	return await axios.get('/system/eOrderNotice/eOrderNoticeListData', {
		params: params,
	});
}
/** 상세 조회 */
export function getSample(noticeNo) {
	return axios.get('/system/eOrderNotice/eOrderNoticeDetailData', {
		params: { noticeNo: noticeNo },
	});
}

// application/x-www-form-urlencoded
// `title=${title}`,
// application/json
// { pointCount: 10, offsetData: 1 }

/** 저장 */
// export function saveSample(strParam) {
// 	return axios.post('/system/eOrderNotice/eOrderNoticeSaveData', strParam);
// }

/** 삭제 */
// export function deleteSample(noticeNo) {
// 	return axios.delete(
// 		'/system/eOrderNotice/eOrderNoticeDeleteData',
// 		`noticeNo=${noticeNo}&compCd=5200&regid=${regId}`,
// 	);
// }
