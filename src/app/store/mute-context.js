"use client";
import { useState, createContext, useRef } from "react";

export const MuteContext = createContext({
  mute: true,
  setMute: () => {},
  handleToggleMute: () => {},
  playMusicHandler: () => {},
});

export const MuteContextProvider = ({ children }) => {
  const [mute, setMute] = useState(true);
  const audioRef = useRef();

  const handleToggleMute = () => {
    setMute((prevState) => !prevState);
  };

  const playMusicHandler = () => {
    audioRef.current.play();
  };
  const value = {
    mute,
    setMute,
    handleToggleMute,
    audioRef,
    playMusicHandler,
  };

  return <MuteContext.Provider value={value}>{children}</MuteContext.Provider>;
};

export default MuteContextProvider;
