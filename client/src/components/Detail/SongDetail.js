import { List } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchDetail } from '../../actions/search_action';
import { decodeQueryParam } from '../../commons/util';
import ListSongSearch from '../ListSong/ListSongSearch';
import ResultSongLoading from '../SearchLoading/ResultSongLoading';

function SongDetail({match, location}) {
    let paramQuery =  decodeQueryParam(location.search.replace("?q=",""));
    const dispatch = useDispatch();
    const resultDetail = useSelector(state => state.search.resultDetail);
    const isFetching = useSelector(state => state.search.isFetchingDetail);

    useEffect(() => {
        dispatch(searchDetail(paramQuery,"song", 1))
    }, [])  

    return (
        <div>
            {
                isFetching ? <ResultSongLoading/> : 
                    <div className="result-song">
                        <h3 className="title" >Bài Hát</h3>
                        <List
                            dataSource={resultDetail}
                            renderItem={item => (
                                <List.Item key={item.encodeId} >
                                    <ListSongSearch songInfo={item} />
                                </List.Item>
                            )}
                        >
                        </List>
                    </div>
            }
             
        </div>
       

    )
}

export default SongDetail
