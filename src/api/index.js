import axios from 'axios';
import { useLoadingStore } from '@/store/loading';

export const api = axios.create();

api.interceptors.request.use(
	function (config) {
		const store = useLoadingStore();
		store.show = true;
		return config;
	},
	function (error) {
		const store = useLoadingStore();
		store.show = true;
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	function (response) {
		const store = useLoadingStore();
		store.show = false;
		return response;
	},
	function (error) {
		const store = useLoadingStore();
		store.show = false;
		return Promise.reject(error);
	},
);
