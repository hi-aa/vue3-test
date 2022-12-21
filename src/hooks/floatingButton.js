import store from '@/store';
import { computed, unref } from 'vue';

export function useFloatingButton(config = {}) {
	const show = computed(() => store.state.floating.show);
	const icon = computed(() => store.state.floating.icon);
	const func = computed(() => store.state.floating.func);

	const { setShow, setIcon, clickEventFunc } = config;

	store.dispatch('floating/setFloatingButton', setShow);
	store.dispatch('floating/setFloatingIcon', setIcon);
	store.dispatch('floating/setFloatingFunc', clickEventFunc);

	const clickEvent = () => {
		if (typeof func.value === 'function') {
			unref(func)();
			// console.log(clickEventFunc);
			// if (clickEventFunc) {
			// 	clickEventFunc();
			// } else {
			// 	console.log('no click evnet');
		}
	};

	return {
		show,
		icon,
		clickEvent,
	};
}
