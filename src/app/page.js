"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NavBar from "@/components/nav/NavBar";
export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
      if (timeToDate <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <>
      <NavBar />
      <main className="flex flex-col h-screen justify-center items-center relative -z-10 overflow-hidden m-auto bg-slate-950">
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
        <div className="absolute ">
          <Image
            alt=""
            src="/diamond_star.gif"
            className="relative left-40 -top-40 sm:relative z-50 mix-blend-screen sm:-top-40 sm:left-96 pointer-events-none"
            height={250}
            width={250}
          />
        </div>
        <h1 className="text-lg sm:text-4xl  text-white pb-2 relative z-20">
          Time Left Until
        </h1>
        <h1 className="text-xl sm:text-8xl font-bold tracking-wider text-white pb-8 relative z-20">
          NEW YEAR
        </h1>
        <div className="grid sm:grid-flow-col gap-5 text-center auto-cols-max relative z-20">
          <div className="flex flex-col bg-slate-200 font-bold p-4 sm:p-10 shadow-2xl shadow-gray-500 rounded-md">
            <span className="countdown text-3xl sm:text-7xl font-bold">
              <span style={{ "--value": countdown.days }}></span>
            </span>
            <p className="text-sm sm:text-base">days</p>
          </div>
          <div className="flex flex-col bg-slate-200 font-bold p-4 sm:p-10 shadow-2xl shadow-gray-500 rounded-md">
            <span className="countdown font-bold text-3xl sm:text-7xl">
              <span style={{ "--value": countdown.hours }}></span>
            </span>
            <p className="text-sm sm:text-base">hours</p>
          </div>
          <div className="flex flex-col bg-slate-200 p-4 sm:p-10 font-bold shadow-2xl shadow-gray-500 rounded-md">
            <span className="countdown font-bold text-3xl sm:text-7xl">
              <span style={{ "--value": countdown.minutes }}></span>
            </span>
            <p className="text-sm sm:text-base">min</p>
          </div>
          <div className="flex flex-col bg-slate-200 font-bold p-4 sm:p-10 shadow-2xl shadow-gray-500 rounded-md">
            <span className="countdown font-bold text-3xl sm:text-7xl text-green-500">
              <span style={{ "--value": countdown.seconds }}></span>
            </span>
            <p className="text-sm sm:text-base">sec</p>
          </div>
        </div>
      </main>
    </>
  );
}
