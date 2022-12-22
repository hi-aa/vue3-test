import axios from 'axios';
import store from '@/store';

export const api = axios.create();

api.interceptors.request.use(
	function (config) {
		store.dispatch('loading/setLoading', true);
		return config;
	},
	function (error) {
		store.dispatch('loading/setLoading', true);
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	function (response) {
		store.dispatch('loading/setLoading', false);
		return response;
	},
	function (error) {
		store.dispatch('loading/setLoading', false);
		return Promise.reject(error);
	},
);
