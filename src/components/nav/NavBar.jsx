import Link from "next/link";
import MuteSvg from "../mute/MuteSvg";
import { useContext, useEffect } from "react";
import { MuteContext } from "@/app/store/mute-context";

export default function NavBar() {
  const { mute, handleToggleMute, setMute, audioRef, playMusicHandler } =
    useContext(MuteContext);
  useEffect(() => {
    playMusicHandler();
  });
  return (
    <div className="navbar bg-green-300 top-0 z-10 absolute">
      <audio
        ref={audioRef}
        muted={mute}
        src="/audio/Mashup.mp3"
        autoPlay
        loop
      ></audio>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost font-sans text-xl">
          The Countdown
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <h1 className="font-sans">SHOP</h1>
              <span className="badge badge-sm indicator-item ">4</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold font-sans text-lg">
                Treat Yourself With Some Gifts this Coming New Year
              </span>
              <Link href="/shop">
                <div className="card-actions">
                  <button className="btn btn-primary bg-green-300 font-sans text-black btn-block">
                    View Shop
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-10">
          <MuteSvg mute={mute} handleToggleMute={handleToggleMute} />
        </div>
      </div>
    </div>
  );
}
