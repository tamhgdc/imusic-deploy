import React, { useEffect, useState } from 'react'

import { List, Pagination } from 'antd';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { searchDetail } from '../../actions/search_action';
import { decodeQueryParam } from '../../commons/util';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import PlaylistLoading from '../PlaylistLoading/PlaylistLoading';


function PlaylistDetail({match, location}) {
    const dispatch = useDispatch();


    let paramQuery =  decodeQueryParam(location.search.replace("?q=",""));

    const resultDetail = useSelector(state => state.search.resultDetail);
    const isFetching = useSelector(state => state.search.isFetchingDetail);
    const counter = useSelector(state => state.search.counter)

    useEffect(() => {
        dispatch(searchDetail(paramQuery,"playlist", 1))
       
    }, [dispatch])

   


    return (
        <div style={{marginTop:"30px"}}>
            
            <h3 className="title" >Playlist/Album</h3>
            {
                isFetching ? <PlaylistLoading/> : 
                    resultDetail?  
                    
                    <List        
                        grid={{
                            gutter: 30,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={resultDetail}
                        renderItem={item => (
                            <List.Item>
                                <LazyLoadComponent>
                                    <PlaylistItem {...item} />
                                </LazyLoadComponent>
                            </List.Item>
                        )}
                    />        
                    
                    :null
            }
        
           

        
        </div>
    )
}

export default PlaylistDetail
