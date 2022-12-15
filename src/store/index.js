import { createStore } from 'vuex';
import notice from '@/store/modules/notice';

export default createStore({
	modules: {
		notice,
	},
	// strict: debug,
	// plugins: debug ? [createLogger()] : []
});
