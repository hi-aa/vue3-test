import { createStore } from 'vuex';
import notice from '@/store/modules/notice';
import floating from '@/store/modules/floating';

export default createStore({
	modules: {
		notice,
		floating,
	},
});
