import { combineReducers } from 'redux';
import playlistReducer from './playlist_reducers'
import uiReducer from './ui_reducer';
import songReducer from './song_reducer';
import queueReducer from './queue_reducer';
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
    playlist: playlistReducer,
    ui: uiReducer,
    song: songReducer,
    queue: queueReducer,
    search: searchReducer
})

export default rootReducer;