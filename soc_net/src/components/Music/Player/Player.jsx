import { useEffect, useState } from "react"; 
import useSound from "use-sound"; //для работы со звуком
import qala from "../audio/add_message.mp3"; // импорт музыки
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import s from './Player.module.css';


const Player = () => {
 
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    }); // текущее положение звука в минутах и секундах

    const [seconds, setSeconds] = useState(); // текущая позиция звука в секундах

    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { pause, duration, sound }] = useSound(qala);

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
    <div className={s.component}>
      <h2>Playing Now</h2>
      <img className={s.musicCover} src="https://v-tagile.ru/images/prof/prof4/music.jpg" alt="img" />
      <div>
        <h3 className={s.title}>Rubaiyyan</h3>
        <p className={s.subTitle}>Qala</p>
      </div>
        <div>
            <div className="time">
            <p>
                {currTime.min}:{currTime.sec}
            </p>
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
      <div>
        <button className={s.playButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
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
        <button className={s.playButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
    

export default Player;
