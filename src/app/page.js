"use client";

import { useEffect, useState, useRef } from "react";
export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  return (
    <main className="flex flex-col h-screen justify-center items-center ">
      <audio
        ref={audioRef}
        src="/audio/JingleBellRock.mp3"
        autoplay
        loop
      ></audio>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": countdown.days }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": countdown.hours }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": countdown.minutes }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": countdown.seconds }}></span>
          </span>
          sec
        </div>
      </div>
    </main>
  );
}
