import React , { useRef, useEffect } from 'react'
import iconPlaying from '../../assets/Images/icon-playing.gif'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSong, pauseSongAction } from '../../actions/song_action';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ListSongSearch.css';
import {  formatTimeAudio } from '../../commons/util';
import { BsFillPlayFill } from 'react-icons/bs';

function ListSongSearch(props) {
    const {songInfo} = props
    const refBtnPlaying = useRef([]);
    const refBtnPlay = useRef([]);
    const refOpacityBg = useRef([]);
   
    const dispatch = useDispatch();

    const currentEncodeSong = useSelector(state => state.song.idSong)
    const isSongPlaying = useSelector(state => state.song.isPlaying);



    useEffect(() => {
        if(currentEncodeSong && refBtnPlaying.current[currentEncodeSong]) {
            if(isSongPlaying) {
                refBtnPlaying.current[currentEncodeSong].style.display = "flex";
                refBtnPlaying.current[currentEncodeSong].style.opacity = "1";
                refBtnPlay.current[currentEncodeSong].style.display = "none";
                refOpacityBg.current[currentEncodeSong].style.opacity = "1";
           }
           else {
                refBtnPlaying.current[currentEncodeSong].style.opacity = "0";
                refBtnPlay.current[currentEncodeSong].style.display = "flex";
                refBtnPlaying.current[currentEncodeSong].style.display = "none";
                refOpacityBg.current[currentEncodeSong].style.opacity = "0";
           }
        }
       
    }, [isSongPlaying,currentEncodeSong])


    const handlePlaySong = (id) => {
     
        Array.from(document.querySelectorAll('.action-container .action-btn-play-pause'), e => e.style.display = "none");
        Array.from(document.querySelectorAll('.action-container .action-btn-play'), e => {
            e.style.display = "flex";
            e.style.opacity = "0";
        });
        Array.from(document.querySelectorAll('.song-left .opacity'), e =>  e.style.opacity = "0");

        dispatch(fetchSong(songInfo));
        refBtnPlaying.current[id].style.display = "flex";
        refBtnPlaying.current[id].style.opacity = "1";
        refBtnPlay.current[id].style.display = "none";
        refOpacityBg.current[id].style.opacity = "1";

    }
   
    const handleStopSong = () => {
        dispatch(pauseSongAction())
    }
    return (
        <div className="list song-data search">
            <div className="song">
                <div className="song-left" onClick={()=>handlePlaySong(songInfo.encodeId)}  >
                    <LazyLoadImage
                        effect="blur"
                        alt={songInfo.alias}
                        height={40}
                        src={songInfo.thumbnail} 
                        width={40} 
                    />
                    <div className="opacity" ref={el => (refOpacityBg.current[songInfo.encodeId] = el)}/>
                    <div className="action-container">
                        <button 
                            className="action-btn-play"
                            ref={el => (refBtnPlay.current[songInfo.encodeId] = el)}
                        >
                            <BsFillPlayFill/>                                                
                        </button>
                        <button 
                            style={{display: "none", width: "30px", height: "30px"}}
                            className="action-btn-play-pause"  
                            ref={el => (refBtnPlaying.current[songInfo.encodeId] = el)}
                            onClick={()=>handleStopSong()}
                        >
                            <img src={iconPlaying} style={{width: "12px", height:"12px"}}/>
                        </button>
                    </div>
                </div>
                <div className="song-info">
                    <span className="song-title">{songInfo.title}</span>
                    <span className="song-artists">{songInfo.artistsNames}</span>
                </div>
            </div>
            <div className="song-duration">
                <div>{formatTimeAudio(songInfo.duration)}</div>
            </div>
            
      </div>
    )
}

export default ListSongSearch
