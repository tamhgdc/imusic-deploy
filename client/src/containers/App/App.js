import React, { Suspense, useEffect } from 'react';
import { Row, Col } from 'antd';
import {Switch} from "react-router-dom";
import PublicRouter from '../../commons/Routers/PublicRouter';
import { Spin } from 'antd';

import { ToastContainer } from 'react-toastify';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Search from '../../components/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { searchHotKeyWord } from '../../actions/search_action';

const Player = React.lazy(()=> import('../Player/Player'))
const DrawerQueue = React.lazy(()=> import('../DrawerQueue/DrawerQueue'))

function App() {
  const dispatch = useDispatch()
  const isFetchingSong = useSelector(state => state.song.isFetching) //show loading depend fetching song 
  useEffect(() => {
      !localStorage.getItem('imusic_queue') && localStorage.setItem('imusic_queue',JSON.stringify({
          currentEncodeId: "",
          encodeIds: [],
          itemsMap: [],
          recommend: [],
          preSong: [],
        }));

      !localStorage.getItem('imusic_player') && localStorage.setItem('imusic_player',JSON.stringify({
        beforeMuteVolume: 1
      }));
      !localStorage.getItem('imusic_title-playlist') && localStorage.setItem('imusic_title-playlist',JSON.stringify({
        titlePlaylist: ""
      }));

      !localStorage.getItem('imusic_currSongInfo') && localStorage.setItem('imusic_currSongInfo',JSON.stringify({}))

      !localStorage.getItem('imusic_history') && localStorage.setItem('imusic_history',JSON.stringify({
        preSong: []
      }));

      !localStorage.getItem('imusic_hasPlayer') && localStorage.setItem('imusic_hasPlayer',false)

      !localStorage.getItem('imusic_defaultVolume') && localStorage.setItem('imusic_defaultVolume','1')
  }, [])

  useEffect(() => {
    dispatch(searchHotKeyWord());
  },[dispatch])

  return (
    <Suspense fallback={(<div></div>)}>
      <Row>
        <Col className="sidebar-layout">
          <PublicRouter exact path="*" component={SideBar}/>
        </Col>
        <Col className="main-layout">
          <div className="background"></div>
          <PublicRouter exact path="*" component={NavBar}/>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {
          isFetchingSong ? 
    
            <Spin tip="Loading..." size="large" style={{position:"fixed", top: "30%", right: "50%", zIndex: 999}}/> 
            : null
          }
          {isFetchingSong ?  <div className="overlay-loading"/>: null}
          <DrawerQueue/>

          <PublicRouter exact path="/" component={Home}/>
          <PublicRouter  path="/search" component={Search}/>



        </Col>
        <Player/>
      </Row>         
    </Suspense>
  );
}

export default App;