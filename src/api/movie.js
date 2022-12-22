// import axios from 'axios';
import { api } from '.';

export async function fetchMovieDailyList(params) {
	return await api.get(
		'/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',
		{
			params: {
				...params,
				key: import.meta.env.VITE_MOVIE_KEY,
			},
		},
	);
}

export async function fetchMovieWeeklyList(params) {
	return await api.get(
		'/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json',
		{
			params: {
				...params,
				key: import.meta.env.VITE_MOVIE_KEY,
			},
		},
	);
}

export default {
	fetchMovieDailyList,
	fetchMovieWeeklyList,
};
