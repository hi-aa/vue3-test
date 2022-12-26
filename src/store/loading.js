import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
	state: () => ({
		show: false,
	}),
	// getters: {},
	actions: {
		setLoading(value = false) {
			this.show = value;
		},
	},
});
