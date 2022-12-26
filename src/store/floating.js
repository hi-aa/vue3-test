import { defineStore } from 'pinia';

export const useFloatingStore = defineStore('floating', {
	state: () => ({
		show: false,
		icon: 'plus',
		func: () => {
			console.log('default');
		},
	}),
	// getters: {},
	actions: {
		setFloatingButton(value = false) {
			this.show = value;
		},
		setFloatingIcon(value) {
			this.icon = value;
		},
		setFloatingFunc(value) {
			console.log(typeof value);
			if (typeof value === 'function') {
				this.func = value;
			}
		},
	},
});
