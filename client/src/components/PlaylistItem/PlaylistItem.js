import React, { useState, useRef, useEffect } from 'react'
import iconPlaying from '../../assets/Images/icon-playing.gif'
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistSong, pauseSongAction } from '../../actions/song_action';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PlaylistItem(props) {
    const { thumbnail, alias, title, encodeId} = props

    const dispatch = useDispatch();
    const refBtnPlaying = useRef([]);
    const refBtnPlay = useRef([]);
    const refOpacityBg = useRef([]);
    const currentEncodePlaylist = useSelector(state => state.queue.idPlaylist)
    const isSongPlaying = useSelector(state => state.song.isPlaying);

    const handlePlaySong = (id) => {
     
        Array.from(document.querySelectorAll('.action-container .action-btn-play-pause'), e => e.style.display = "none");
        Array.from(document.querySelectorAll('.action-container .action-btn-play'), e => {
            e.style.display = "flex";
            e.style.opacity = "0";
        });
        Array.from(document.querySelectorAll('.card-container .opacity'), e =>  e.style.opacity = "0");
        console.log(id);
        dispatch(fetchPlaylistSong(id,1))

        localStorage.setItem('imusic_title-playlist',JSON.stringify({
            titlePlaylist: title
        }));

        refBtnPlaying.current[id].style.display = "flex";
        refBtnPlaying.current[id].style.opacity = "1";
        refBtnPlay.current[id].style.display = "none";
        refOpacityBg.current[id].style.opacity = "1";

    } 
    
    useEffect(() => {
        if(currentEncodePlaylist && refBtnPlaying.current[currentEncodePlaylist]) {
            if(isSongPlaying) {
                refBtnPlaying.current[currentEncodePlaylist].style.display = "flex";
                refBtnPlaying.current[currentEncodePlaylist].style.opacity = "1";
                refBtnPlay.current[currentEncodePlaylist].style.display = "none";
                refOpacityBg.current[currentEncodePlaylist].style.opacity = "1";
           }
           else {
                refBtnPlaying.current[currentEncodePlaylist].style.opacity = "0";
                refBtnPlay.current[currentEncodePlaylist].style.display = "flex";
                refBtnPlaying.current[currentEncodePlaylist].style.display = "none";
                refOpacityBg.current[currentEncodePlaylist].style.opacity = "0";
           }
        }
       
    }, [isSongPlaying,currentEncodePlaylist])
    const handleStopSong = () => {
        dispatch(pauseSongAction())
    }
    return (
        <div className="carousel-item">
            <div className="carousel-card">
                <div className="card-wrapper">
                    <div className="card-container">
                        <LazyLoadImage
                            effect="blur"
                            alt={alias}
                            height={'100%'}
                            src={thumbnail} 
                            width={'100%'}
                            className="card-img" 
                        />
                        <div className="opacity" ref={el => (refOpacityBg.current[encodeId] = el)}/>
                        <div className="action-container">
                            <button 
                                className="action-btn-play"  
                                ref={el => (refBtnPlay.current[encodeId] = el)}
                                onClick={()=>handlePlaySong(encodeId)}
                            >
                                <BsFillPlayFill/>                                                
                            </button>
                            <button 
                                style={{display:"none"}}
                                className="action-btn-play-pause"  
                                ref={el => (refBtnPlaying.current[encodeId] = el)}
                                onClick={()=>handleStopSong()}
                            >
                                <img src={iconPlaying}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <h4 className="card-title">{title}</h4>
                </div>         
            </div>
        </div>   
    )
}

export default PlaylistItem
