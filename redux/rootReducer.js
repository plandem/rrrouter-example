import { combineReducers } from 'redux';
import { reducer as router} from 'rrrouter-redux';
import { reducer as auth} from 'rrrouter-redux-auth';
import { reducer as error} from './error';
import { reducer as loading} from './loading';

export default combineReducers({
	router,
	auth,
	error,
	loading,
});