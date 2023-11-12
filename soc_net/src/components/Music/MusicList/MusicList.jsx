import React from "react";
import { useEffect, useState } from "react"; 
import useSound from "use-sound";
import s from './MusicList.module.css';
import { AiOutlineHeart, AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { IconContext } from "react-icons"; // для кастомизации иконок



const MusicList = (props) => {

    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    });

    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { pause, duration, sound }] = useSound(props.file);

    const [seconds, setSeconds] = useState(); 

    const playingButton = () => {
        if (isPlaying) {
        pause(); // приостанавливаем воспроизведение звука
        setIsPlaying(false);
        } else {
        play(); // воспроизводим аудиозапись
        setIsPlaying(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
        if (sound) {
            setSeconds(sound.seek([])); // устанавливаем состояние с текущим значением в секундах
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
            min,
            sec,
            });
        }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);
    return (
        <div className={s.containerTrack}>
           {!isPlaying ? (
          <button className={s.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={s.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
            <div className={s.MusName_like_line}>
                {props.title}
            <div className={s.line_like}>
                <div>
                    <div className="time">
                    <span>
                        {currTime.min}:{currTime.sec}
                    </span>
                    </div>
                        <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        value={seconds}
                        className="timeline"
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                        />
                </div>
                {/* {props.gener} */}
                <div>
                    <span><AiOutlineHeart />{props.like_count}</span>
                    <span><BsFillMusicPlayerFill />{props.plays_count}</span>
                </div>
            </div>
            </div>
            
            
        </div>
    )
}

export default MusicList;