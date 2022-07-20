import React from 'react'
import Skeleton from 'react-loading-skeleton';

function TopResultLoading() {
    return (
        <div className="top-result">
            <h3 className="title">
                <Skeleton width={200} height={30}/>
            </h3>
            <div className="search-song-list">
                <div className="song-item">
                    <div className="song-left">
                        <Skeleton style={{height: "90%",width: "100%"}}/>  
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: "15px"}}>
                        <Skeleton width={80} height={12}/> 
                        <Skeleton width={50} height={12}/>     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopResultLoading
