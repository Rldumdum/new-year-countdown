"use client";

import { useEffect, useState, useRef } from "react";
import MuteSvg from "../components/mute/MuteSvg";
import Image from "next/image";
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
    <main className="flex flex-col h-screen justify-center items-center  m-auto bg-slate-950">
      <div className="opacity-20">
        <Image
          alt="Background"
          src="/bg.png"
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{ pointerEvents: "none" }}
        />
      </div>
      <div className="navbar bg-green-300 top-0 fixed">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">New Year Countdown</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <h1>SHOP</h1>
                <span className="badge badge-sm indicator-item ">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  Treat Yourself With Some Gifts this Coming New Year
                </span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View Shop
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10">
            <MuteSvg mute={mute} handleToggleMute={handleToggleMute} />
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        muted={mute}
        src="/audio/JingleBellRock.mp3"
        autoPlay
        loop
      ></audio>

      <h1 className="text-5xl font-serif text-white pb-6 relative z-20">
        New Year Countdown
      </h1>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max relative z-20">
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
