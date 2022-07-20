import * as songTypes from '../constants/song_constant';
import { toastError } from '../helpers/toastHelper';


const initialState = {
    idSong: null,
    idPlaylist: null,
    suggestedSongs: [],
    playlistSongs: [],
    currSong: {},
    urlSong: {},
    isFetching: false,
    isPlaying: false,
};

  
const reducer = (state = initialState, action) => {

    switch (action.type) {
      case songTypes.PAUSE_SONG: {
        return {
          ...state,
          isPlaying: false
        }
      }
      case songTypes.TOGGLE_PLAY_PAUSE_SONG: {
        return {
          ...state,
          isPlaying: !state.isPlaying
        }
      }
      case songTypes.FETCH_PLAYLIST_SONG: {
        return {
          ...state,
          isFetching: true,
          idPlaylist: action.encodeId,
        };
      }
      case songTypes.FETCH_PLAYLIST_SONG_SUCCESS: {
        const { data } = action.payload;
        return {
          ...state,
          isFetching: false,
          playlistSongs: data.items,
        };
      }
      case songTypes.FETCH_PLAYLIST_SONG_FAILED: {
        toastError("🦄 Xảy ra lỗi!");
        return {
            ...state,
            isFetching: false,
            playlistSongs: [],
        }
      } 
      case songTypes.FETCH_SONG: {

        return {
          ...state,
          isFetching: true,
          idSong: action.songInfo.encodeId,
          idPlaying: false
        };
      }
      case songTypes.FETCH_SONG_SUCCESS: {
        const { url, songInfo } = action.payload;
        return {
          ...state,
          isFetching: false,
          urlSong: url,
          isPlaying: true,
          currSong: songInfo,

        };
      }
      case songTypes.FETCH_SONG_FAILED: {
        toastError("🦄 Xảy ra lỗi!");
        return {
            ...state,
            isFetching: false,
            urlSong: {},
            currSongL: {},
            isPlaying: false,
        }
      }
      case songTypes.FETCH_SUGGESTED_SONG: {
        return {
          ...state,
          suggestedSongs: []
        };
      }
      case songTypes.FETCH_SUGGESTED_SONG_SUCCESS: {
        const { data } = action.payload;
        return {
          ...state,
          suggestedSongs: data
        };
      }
      case songTypes.FETCH_SUGGESTED_SONG_FAILED: {
        toastError("🦄 Xảy ra lỗi!");
        return {
            ...state,
            suggestedSongs: []
        }
      } 
      default:
        return state;
    }
  };
  
  export default reducer;
  
