import React from 'react'
import Skeleton from 'react-loading-skeleton';

function ResultSongLoading() {
    let arr = [1,2,3,4,5]

    return (
        <div style={{marginTop: "60px"}}>
            <h3 className="title">
                <Skeleton width={200} height={30}/>
            </h3>
        {
            arr.map(i => {
            return (                   
                <div className="list song-data search" key={i}>
                    <div className="song">
                        <div className="song-left">
                            <Skeleton width={40} height={40}/>  
                        </div>
                        <div className="song-info">
                            
                            <Skeleton width={180} height={12}/> 
                            <Skeleton width={70} height={12}/>     
                        </div>
                    </div>
                    <div className="song-duration">
                        <Skeleton width={30} height={12}/> 
                    </div>
                    
                </div>
            )})
        }
            
        </div>
    )
}

export default ResultSongLoading
