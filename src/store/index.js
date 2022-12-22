import { createStore } from 'vuex';
import notice from '@/store/modules/notice';
import floating from '@/store/modules/floating';
import loading from '@/store/modules/loading';

export default createStore({
	modules: {
		notice,
		floating,
		loading,
	},
});
