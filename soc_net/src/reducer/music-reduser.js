import { musicAPI } from "../api/api.js";

const SET_MUSIC = "SET_MUSIC";



let initialState = {
  music: [],

};

export const MusicReducer = (state = initialState, action) => {

    switch (action.type) {
      case SET_MUSIC:
        return {
          ...state,
          music: action.music,
        };

      default:
        return state;
    }
}

export const getMusic = () => {
  return async (dispach) => {
    const response = await musicAPI.getMusic();
    dispach(setMusic(response));
  };
};


export default MusicReducer;


export const setMusic = (music) => ({ type: SET_MUSIC, music: music });

