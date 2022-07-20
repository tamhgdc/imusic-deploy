import axiosService from '../commons/axiosService';
import { ROOT_URL, SEARCH_MULTI_ENDPOINT, GET_HOT_KEYWORD_SEARCH, GET_SUGGEST_SEARCH, GET_DETAIL_SEARCH, GET_COUNTER_SEARCH } from '../constants/endpoint_constant';

export const getSearch = (query) => {

    return axiosService.get(`${ROOT_URL}/${SEARCH_MULTI_ENDPOINT}`,{
        params: {
            query: query
        }
    });
};

export const getHotKeyWordSearch = () => {
    return axiosService.get(`${ROOT_URL}/${GET_HOT_KEYWORD_SEARCH}`);
}

export const getSuggestSearch = (query) => {

    return axiosService.get(`${ROOT_URL}/${GET_SUGGEST_SEARCH}`,{
        params: {
            query: query
        }
    });
}

export const getDetailSearch = (query, type, page) => {
    return axiosService.get(`${ROOT_URL}/${GET_DETAIL_SEARCH}`,{
        params: {
            query: query,
            type: type,
            page: page
        }
    });
}

export const getSearchCounter = (query) => {
    return axiosService.get(`${ROOT_URL}/${GET_COUNTER_SEARCH}`,{
        params: {
            query: query,

        }
    });
}