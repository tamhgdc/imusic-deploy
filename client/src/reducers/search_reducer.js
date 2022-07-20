import * as searchTypes from '../constants/search_constant';
import { toastError } from '../helpers/toastHelper';


const initialState = {
    hotKeyWord: [],
    suggest: [],
    resultSearch: {},
    isFetching: false,
    resultDetail: [],
    isFetchingDetail: false,
    counter: {},
    isFetchingCounter: false,
};

  
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case searchTypes.SEARCH_MULTI: {
            return {
                ...state,
                isFetching: true
            }
        }
        case searchTypes.SEARCH_MULTI_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                resultSearch: data,
                isFetching: false
            }
        }
        case searchTypes.SEARCH_MULTI_FAILED: {
            return {
                ...state,
                resultSearch: {},
                isFetching: true
            }
        }
        case searchTypes.SEARCH_HOT_KEYWORD: {
            return {
                ...state,
                hotKeyWord: []
            }
        }
        case searchTypes.SEARCH_HOT_KEYWORD_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                hotKeyWord: data
            }
        }   
        case searchTypes.SEARCH_HOT_KEYWORD_FAILED: {

            toastError("🦄 Xảy ra lỗi!");
            return {
                ...state,
                hotKeyWord: []
            }
        }
        case searchTypes.SEARCH_SUGGEST: {
            return state;
        }
        case searchTypes.SEARCH_SUGGEST_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                suggest: data
            }
        }   
        case searchTypes.SEARCH_SUGGEST_FAILED: {

            toastError("🦄 Xảy ra lỗi!");
            return {
                ...state,
                suggest: []
            }
        }
        case searchTypes.SEARCH_DETAIL: {
            return {
                ...state,
                isFetchingDetail: true
            }
        }
        case searchTypes.SEARCH_DETAIL_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                resultDetail: data,
                isFetchingDetail: false
            }
        }   
        case searchTypes.SEARCH_DETAIL_FAILED: {

            toastError("🦄 Xảy ra lỗi!");
            return {
                ...state,
                resultDetail: [],
                isFetchingDetail: true
            }
        }
        case searchTypes.SEARCH_GET_COUNTER: {
            return {
                ...state,
                isFetchingCounter: true
            }
        }
        case searchTypes.SEARCH_GET_COUNTER_SUCCESS: {
            const { data } = action.payload;

            return {
                ...state,
                counter: data,
                isFetchingCounter: false
            }
        }
        case searchTypes.SEARCH_GET_COUNTER_FAILED: {
            toastError("🦄 Xảy ra lỗi!");
            return {
                ...state,
                counter: {},
                isFetchingCounter: true
            }
        }
        default:
            return state;
    }
  };


export default reducer;
