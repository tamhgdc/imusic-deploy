import React, { useState, useEffect } from 'react'
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showDrawerQueue } from '../../actions/ui_action';
import './DrawerQueue.css';
import { List } from 'antd';
import ListSongQueue from '../../components/ListSong/ListSongQueue';


function DrawerQueue() {
    const toggeShowDrawerQueue = useSelector(state => state.ui.toggeShowDrawerQueue)
    let queues = JSON.parse(localStorage.getItem('imusic_queue')).itemsMap
    let suggestedSongs = useSelector(state => state.song.suggestedSongs);

    const currSongRedux = useSelector(state => state.song.currSong)
    const currSongStorage = JSON.parse(localStorage.getItem('imusic_currSongInfo'));
    const { titlePlaylist } = JSON.parse(localStorage.getItem('imusic_title-playlist'));

    let currSongInfo = Object.keys(currSongRedux).length === 0 ? currSongStorage : currSongRedux; 

    let indexCurrSong = queues.findIndex(e => e.encodeId === currSongInfo.encodeId)


    let preSong = queues.slice(0, indexCurrSong);
    let nextSong = queues.slice(indexCurrSong + 1, queues.length)

    const dispatch = useDispatch()
    const [toggleBtn,setToggleBtn] = useState(false);

    
  
    const onClose = () => {
      dispatch(showDrawerQueue())
    };
    
    return (
        <Drawer
          width={320}
          closable={false}
          maskClosable={true}
          onClose={onClose}
          zIndex={7}
          visible={toggeShowDrawerQueue}
          mask={true}
          className="drawer-queue-container"
        > 
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className="drawer-queue-header">
              <div className={`drawer-queue-header-right${toggleBtn ? '' : ' is-active'}`} onClick={()=>setToggleBtn(false)}>
                <span>Danh sách phát</span>
              </div> 
              <div className={`drawer-queue-header-left${toggleBtn ? ' is-active' : ''}`} onClick={()=>setToggleBtn(true)}>
                <span>Nghe gần đây</span>
              </div>
            </div>
          </div>
          <div className="drawer-queue-scroll">
          <div className="scroll-container">
            <div className="scroll-content">
              <List
                style={{display: preSong && preSong.length ? "unset" : "none"}}
                dataSource={preSong}
                renderItem={item => (
                  <List.Item key={item.encodeId} className="previous-song">
                      <ListSongQueue songInfo={item} />
                  </List.Item>
                )}
              >
              </List>
              <div className="current-song">
                <ListSongQueue 
                  songInfo={currSongInfo}
                />
              </div>
              <div className="title-next-song" style={{display:nextSong.length? "unset": "none"}}>
                <div className="title">Tiếp theo</div>
                <div className="sub-title">Từ playlist <span>{titlePlaylist}</span></div>
              </div>
              <List
                style={{display:nextSong.length? "unset": "none"}}
                dataSource={nextSong}
                renderItem={item => (
                  <List.Item key={item.encodeId} className="next-song">
                      <ListSongQueue songInfo={item} />
                  </List.Item>
                )}
              >
              </List>
             
              <div className="title-next-song">
                <div className="title">Tiếp theo</div>
                <div className="sub-title">Từ gợi ý <span>{currSongInfo.title}</span></div>
              </div>
              /* Suggest song */
              <List
                dataSource={suggestedSongs}
                renderItem={item => (
                  <List.Item key={item.encodeId} className="next-song">
                      <ListSongQueue songInfo={item} />
                  </List.Item>
                )}
              >
              </List>
            </div>
          </div>
            
          </div>

        </Drawer>
    )
}

export default DrawerQueue
