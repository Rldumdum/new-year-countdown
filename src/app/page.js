"use client";

import { useEffect, useState, useRef } from "react";
import MuteSvg from "../components/mute/MuteSvg";
export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mute, setMute] = useState(true);
  const audioRef = useRef();

  const playMusicHandler = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    const countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();
    const interval = setInterval(function () {
      let now = new Date().getTime();
      let timeToDate = countDownDate - now;

      const days = Math.floor(timeToDate / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeToDate % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeToDate % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
      if (timeToDate < 0) {
        clearInterval(interval);
      }
    }, 1000);

    playMusicHandler();
    return () => clearInterval(interval);
  }, [countdown]);

  const handleToggleMute = () => {
    setMute((prevState) => !prevState);
  };

  return (
    <main className="flex flex-col h-screen justify-center items-center ">
      <nav className="w-full bg-slate-200 h-20 absolute top-0">
        <div className="absolute top-0 right-5">
          <MuteSvg mute={mute} handleToggleMute={handleToggleMute} />
        </div>
      </nav>
      <audio
        ref={audioRef}
        muted={mute}
        src="/audio/JingleBellRock.mp3"
        autoPlay
        loop
      ></audio>
      <h1 className="text-5xl font-serif pb-6">New Year Countdown</h1>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col bg-slate-200 p-10">
          <span className="countdown font-mono text-7xl">
            <span style={{ "--value": countdown.days }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col bg-slate-200 p-10">
          <span className="countdown font-mono text-7xl">
            <span style={{ "--value": countdown.hours }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col bg-slate-200 p-10">
          <span className="countdown font-mono text-7xl">
            <span style={{ "--value": countdown.minutes }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col bg-slate-200 p-10">
          <span className="countdown font-mono text-7xl text-green-500">
            <span style={{ "--value": countdown.seconds }}></span>
          </span>
          sec
        </div>
      </div>
    </main>
  );
}
