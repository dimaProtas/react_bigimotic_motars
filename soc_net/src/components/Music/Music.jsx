import React from 'react';
import Player from './Player/Player.jsx';
import MusicList from './MusicList/MusicList.jsx';
import s from './Music.module.css';


const Music = (props) => {
    return (
        <div className={s.containerMusic}>
            <div>
                {props.music.map(mus => {
                    return (
                    <MusicList 
                        key={mus.id} 
                        title={mus.title}
                        like_count={mus.like_count}
                        plays_count={mus.plays_count}
                        gener={mus.gener}
                        file={mus.file}
                    />
                    )
                })}
            </div>
            <Player />
        </div>
    )
}

export default Music;