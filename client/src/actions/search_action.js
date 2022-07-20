import * as searchTypes from '../constants/search_constant';


export const searchMulti = (query) => {
    return {
        type: searchTypes.SEARCH_MULTI,
        query: query
    };
}

export const searchMultiSuccess = (data) => {
    return {
      type: searchTypes.SEARCH_MULTI_SUCCESS,
      payload: {
        data,
      },
    };
};
  
export const searchMultiFailed = error => {
    return {
      type: searchTypes.SEARCH_MULTI_FAILED,
      payload: {
        error,
      },
    };
};

export const searchHotKeyWord = () => {
    return {
        type: searchTypes.SEARCH_HOT_KEYWORD,
    };
}

export const searchHotKeyWordSuccess = (data) => {
    return {
      type: searchTypes.SEARCH_HOT_KEYWORD_SUCCESS,
      payload: {
        data,
      },
    };
};
  
export const searchHotKeyWordFailed = error => {
    return {
      type: searchTypes.SEARCH_HOT_KEYWORD_FAILED,
      payload: {
        error,
      },
    };
};

export const searchSuggest = (query) => {
    return {
        type: searchTypes.SEARCH_SUGGEST,
        query:  query
        
    };
}

export const searchSuggestSuccess = (data) => {
    return {
        type: searchTypes.SEARCH_SUGGEST_SUCCESS,
        payload: {
            data,
        },
        
    };
}

export const searchSuggestFailed = (error) => {
    return {
        type: searchTypes.SEARCH_SUGGEST_FAILED,
        payload: {
            error,
        },
        
    };
}

export const searchDetail = (query, typeFetch, page) => {
  return {
      type: searchTypes.SEARCH_DETAIL,
      query: query,
      typeFetch: typeFetch,
      page: page

  };
}

export const searchDetailSuccess = (data) => {
  return {
    type: searchTypes.SEARCH_DETAIL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const searchDetailFailed = error => {
  return {
    type: searchTypes.SEARCH_DETAIL_FAILED,
    payload: {
      error,
    },
  };
};


export const getCounter = (query) => {
  return {
    type: searchTypes.SEARCH_GET_COUNTER,
    query: query

  }
}

export const getCounterSuccess = (data) => {
  return {
    type: searchTypes.SEARCH_GET_COUNTER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getCounterFailed = error => {
  return {
    type: searchTypes.SEARCH_GET_COUNTER_FAILED,
    payload: {
      error,
    },
  };
};
