import React,  { useEffect }  from 'react'
import TopResultLoading from '../SearchLoading/TopResultLoading';
import PlaylistLoading from '../PlaylistLoading/PlaylistLoading';
import ResultSongLoading from '../SearchLoading/ResultSongLoading';
import ListSongSearch from '../ListSong/ListSongSearch';
import { searchDetail, searchMulti } from '../../actions/search_action';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';


import { List } from 'antd';
import Playlist from '../Playlist/Playlist';

function AllDetail() {
    const dispatch = useDispatch()

    const resultSearch = useSelector(state => state.search.resultSearch)
    const isFetching = useSelector(state => state.search.isFetching)

    // useEffect(() => {
    //     dispatch(searchMulti(paramQuery));
    // }, [dispatch])

      
    const renderObjectType = (objectType) => {
        switch(objectType) {
            case 'song': {
                return "Bài Hát"
            }
            case 'playlist': {
                return "Playlist/Album"
            }
            case 'artist' : {
                return "Nghệ Sĩ"
            }
        }
    }
    return (
        <div>
            {
                isFetching ? <TopResultLoading/> :
                
                    resultSearch && resultSearch.top ? 
                    <div className="top-result">
                        {/* <h3 className="title">Top Kết Quả "{paramQuery}"</h3> */}
                        <div className="search-song-list">
                            <div className="song-item">
                                <div className="song-left">
                                    <LazyLoadImage
                                        effect="blur"
                                        height={'100%'}
                                        alt={resultSearch.top.alias}
                                        src={resultSearch.top.thumbnail} 
                                        width={'100%'}
                                    />
                                </div>
                                <div className="song-right">
                                    <div className="title">{resultSearch.top.title}</div>
                                    <div className="subtitle">{renderObjectType(resultSearch.top.objectType)}</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    : null
                

            }

            {
                isFetching ? <ResultSongLoading/> : 
                resultSearch && resultSearch.songs ? 
                    <div className="result-song">
                        {/* <h3 className="title" onClick={() => dispatch(searchDetail(paramQuery,"song", 1))}>Bài Hát</h3> */}
                        <List
                            dataSource={resultSearch.songs}
                            renderItem={item => (
                                <List.Item key={item.encodeId} >
                                    <ListSongSearch songInfo={item} />
                                </List.Item>
                            )}
                        >
                        </List>
                    </div>
                :null
            }

            {   
                isFetching ? <PlaylistLoading/> : 
                resultSearch && resultSearch.playlists ? 
                    <Playlist title={"Playlist/Album"} data={resultSearch.playlists} /> 
                : null 
            }
        </div>
    )
}

export default AllDetail
