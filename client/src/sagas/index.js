import {
    call,
    delay,
    put,
    select,
    takeEvery,
    takeLatest,
    take,
    all
} from 'redux-saga/effects';
import * as songTypes from '../constants/song_constant';
import * as playlistTypes from '../constants/playlist_constants';
import * as searchTypes from '../constants/search_constant';

import { STATUS_CODE } from '../constants/index';

import {
    fetchPlaylistSuccess,
    fetchPlaylistFailed,
    fetchGallerySuccess,
    fetchGalleryFailed,
} from '../actions/playlist_action';

import { 
    showLoading,
    hideLoading,
} from '../actions/ui_action';

import { 
    fetchPlaylistSongSuccess, 
    fetchPlaylistSongFailed, 
    fetchSong, 
    fetchSongSuccess, 
    fetchSongFailed, 
    fetchSongSuggestedSuccess 
} from '../actions/song_action';
import  {
    searchHotKeyWordSuccess,
    searchHotKeyWordFailed,
    searchSuggestSuccess,
    searchSuggestFailed,
    searchMultiSuccess,
    searchMultiFailed,
    searchDetailSuccess,
    searchDetailFailed,
    getCounterSuccess,
    getCounterFailed
} from '../actions/search_action';

import { getPlaylist,getGallery } from '../apis/playlist_api';
import { getSongPlaylist,getSong, getSongSuggested } from '../apis/song_api';
import { addPlaylistToQueue, addSongToQueue } from '../actions/queue_action';

import { getSearch, getHotKeyWordSearch, getSuggestSearch, getDetailSearch, getSearchCounter } from '../apis/search_api';





function* fetchPlaylistSaga() {    
    yield put(showLoading());
    
    const resp = yield call(getPlaylist);

    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchPlaylistSuccess(data));
    } else {
        yield put(fetchPlaylistFailed(data));
    }
    yield delay(500);

    yield put(hideLoading());

}

function* fetchGallerySaga() {
    yield put(showLoading());

    const resp = yield call(getGallery);

    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchGallerySuccess(data));
    } else {
        yield put(fetchGalleryFailed(data));
    }

    yield delay(500);
    yield put(hideLoading());
}

function* fetchSongSaga(payload) {
    const { songInfo}  = payload;
    console.log(songInfo);

    const resp = yield call(getSong, songInfo.encodeId)
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchSongSuccess(data, songInfo)); 

        localStorage.setItem('imusic_currSongInfo',JSON.stringify(songInfo))      
        localStorage.setItem('imusic_hasPlayer',true)
        localStorage.setItem('imusic_urlSong',JSON.stringify(data))
    } else {
        yield put(fetchSongFailed(data));
    }
}

function* fetchSuggestedSongSaga(payload) {
    const {encodeId}  = payload;

    const resp = yield call(getSongSuggested,encodeId)
    const { status, data } = resp;
    console.log(data)
    if (status === STATUS_CODE.SUCCESS) {
        let queue = JSON.parse(localStorage.getItem('imusic_queue'))

        localStorage.setItem('imusic_queue',JSON.stringify({...queue,recommend: data}))
        yield  put(addSongToQueue(data,encodeId))    
        yield put(fetchSongSuggestedSuccess(data));   
    } else {
        yield put(fetchSong(data));
    }

}

function* fetchSongPlaylistSaga(payload) { 
    const {encodeId}  = payload;

    const resp = yield call(getSongPlaylist,encodeId)
    
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        const {items} = data;
        //fetch first song streaming of playlist and add to queue
        yield put(fetchPlaylistSongSuccess(data))
        yield put(fetchSong(items[0]))
        yield  put(addPlaylistToQueue(data,encodeId))
        // save data song to queue local storage
        let queue = JSON.parse(localStorage.getItem('imusic_queue'))

        localStorage.setItem('imusic_queue',JSON.stringify({...queue,
            currentEncodeId: items[0].encodeId,
            encodeIds: items.map(i=>i.encodeId),
            itemsMap: items,
            playlistEncodeId: encodeId,
            preSong: []
        }));
    } else {
        yield put(fetchPlaylistSongFailed(data));
    }

}

function* fetchSearchMulti(payload) {
    const { query } = payload;
    const resp = yield call(getSearch, query);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(searchMultiSuccess(data.data));
    }
    else {
        yield put(searchMultiFailed(data)); 
    }
}

function* fetchSearchSuggest(payload) {
    const { query } = payload;
    
    const resp = yield call(getSuggestSearch, query);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(searchSuggestSuccess(data.data[0].keyword));
    }
    else {
        yield put(searchSuggestFailed(data.err)); 
    }
}

function* fetchSearchHotKeyWord() {

    const resp = yield call(getHotKeyWordSearch);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(searchHotKeyWordSuccess(data.data))
    }
    else {
        yield put(searchHotKeyWordFailed(data.err)); 
    }
}

function* fetchSearchDetail(payload) {
    const {typeFetch, page, query} = payload;
    const resp = yield call(getDetailSearch,query,typeFetch, page);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(searchDetailSuccess(data.data.items))
    }
    else {
        yield put(searchDetailFailed(data.err)); 
    }
}

function* fetchSearchCounter(payload) {
    const {query} = payload;
    const resp = yield call(getSearchCounter,query);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCESS) {
        yield put(getCounterSuccess(data.data))
    }
    else {
        yield put(getCounterFailed(data.err)); 
    }

}

function* rootSaga() {
    yield takeLatest(playlistTypes.FETCH_GALLERY, fetchGallerySaga);
    yield takeLatest(playlistTypes.FETCH_PLAYLIST, fetchPlaylistSaga);

    yield takeLatest(songTypes.FETCH_PLAYLIST_SONG, fetchSongPlaylistSaga);
    yield takeLatest(songTypes.FETCH_SONG,fetchSongSaga)
    yield takeLatest(songTypes.FETCH_SUGGESTED_SONG, fetchSuggestedSongSaga);

    yield takeLatest(searchTypes.SEARCH_MULTI, fetchSearchMulti);
    yield takeLatest(searchTypes.SEARCH_SUGGEST, fetchSearchSuggest);
    yield takeLatest(searchTypes.SEARCH_HOT_KEYWORD, fetchSearchHotKeyWord);

    yield takeLatest(searchTypes.SEARCH_DETAIL, fetchSearchDetail)
    yield takeLatest(searchTypes.SEARCH_GET_COUNTER, fetchSearchCounter)


}

export default rootSaga;