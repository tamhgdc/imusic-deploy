import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Search.css';
import { List, Menu, Badge } from 'antd';

import ListSongSearch from '../ListSong/ListSongSearch';
import Playlist from '../Playlist/Playlist';
import { useDispatch, useSelector } from 'react-redux';
import { getCounter, searchDetail, searchMulti } from '../../actions/search_action';
import { decodeQueryParam } from '../../commons/util';
import TopResultLoading from '../SearchLoading/TopResultLoading';
import PlaylistLoading from '../PlaylistLoading/PlaylistLoading';
import ResultSongLoading from '../SearchLoading/ResultSongLoading';
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router';
import SongDetail from '../Detail/SongDetail';
import PublicRouter from '../../commons/Routers/PublicRouter';
import PlaylistDetail from '../Detail/PlaylistDetail';

function Search({match, location}) {
    const dispatch = useDispatch()
    const history = useHistory();
    let { pathname } = useLocation();
    const { path } = useRouteMatch();
    let paramQuery =  decodeQueryParam(location.search.replace("?q=",""));
    const resultSearch = useSelector(state => state.search.resultSearch)
    const isFetching = useSelector(state => state.search.isFetching)
    const isFetchingCounter = useSelector(state => state.search.isFetchingCounter)
    const counter = useSelector(state => state.search.counter)
    useEffect(() => {
        if(!pathname.includes('/detail')) {
            dispatch(searchMulti(paramQuery));
        }
    }, [dispatch, location.key])
    
    useEffect(() => {
        dispatch(getCounter(paramQuery));
    },[dispatch])


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
    const renderDefaultSelectKeys = () => {
        switch(window.location.pathname) {
            case '/search': {
                return "all"
            }
            case '/search/detail/song': {
                return "song"
            }
            case '/search/detail/playlist' : {
                return "playlist"
            }
        }
    }
    return (
        <div className="search-page_container">

            <div className="search-nav">
                <h3 className="title">Kết Quả Tìm Kiếm</h3>
                <Menu  defaultSelectedKeys={renderDefaultSelectKeys()} mode="horizontal">
                    <Menu.Item key="all" onClick={()=>history.push(`${path}?q=${paramQuery}`)}>
                        TẤT CẢ 
                    </Menu.Item>
                    <Menu.Item key="song" onClick={()=>history.push(`${path}/detail/song?q=${paramQuery}`)} >
                        BÀI HÁT
                        {
                            isFetchingCounter ? 
                                <Badge 
                                    count={0} 
                                    className="search-badge-count"
                                    showZero
                                />
                            :
                            counter && counter.song ? 
                                <Badge 
                                    count={counter.song} 
                                    className="search-badge-count"
                                    overflowCount={999}
                                    showZero
                                />
                                :null
                        }
                        
                    </Menu.Item>
                    <Menu.Item key="playlist" onClick={()=>history.push(`${path}/detail/playlist?q=${paramQuery}`)}>
                        PLAYLIST/ALBUM
                        {
                            isFetchingCounter ? 
                                <Badge 
                                    count={0} 
                                    className="search-badge-count"
                                    showZero
                                />
                            :
                            counter && counter.playlist ? 
                                <Badge 
                                    count={counter.playlist} 
                                    className="search-badge-count"
                                    overflowCount={999}
                                    showZero
                                />
                                :null
                        }
                    </Menu.Item>
                </Menu>
            </div>
            <Switch>

                <Route  exact path={path}>

                    {
                        isFetching ? <TopResultLoading/> :
                        
                            resultSearch && resultSearch.top ? 
                            <div className="top-result">
                                <h3 className="title">Top Kết Quả "{paramQuery}"</h3>
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
                                <h3 className="title" onClick={() => dispatch(searchDetail(paramQuery,"song", 1))}>Bài Hát</h3>
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
                
                </Route>
                <PublicRouter path={`${path}/detail/song`} component={SongDetail}/>
                <PublicRouter path={`${path}/detail/playlist`} component={PlaylistDetail} />
            </Switch>
        </div>
    )
}

export default Search
