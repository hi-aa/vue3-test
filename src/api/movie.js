// import axios from 'axios';
import { api } from '.';

export async function fetchMovieList(params) {
	return await api.get(
		`/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json`,
		{
			params: {
				...params,
				key: import.meta.env.VITE_MOVIE_KEY,
			},
		},
	);
}

export default { fetchMovieList };