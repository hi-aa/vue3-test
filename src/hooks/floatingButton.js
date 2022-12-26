import { computed, unref } from 'vue';
import { useFloatingStore } from '@/store/floating';

export function useFloatingButton(config = {}) {
	const store = useFloatingStore();
	const show = computed(() => store.show);
	const icon = computed(() => store.icon);
	const func = computed(() => store.func);

	const { setShow, setIcon, clickEventFunc } = config;

	store.setFloatingButton(setShow);
	store.setFloatingIcon(setIcon);
	store.setFloatingFunc(clickEventFunc);

	const clickEvent = () => {
		if (typeof func.value === 'function') {
			unref(func)();
		}
	};

	return {
		show,
		icon,
		clickEvent,
	};
}
