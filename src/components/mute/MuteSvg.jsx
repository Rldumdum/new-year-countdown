"use client";
import React, { useEffect, useRef, useState } from "react";
import { interpolate } from "flubber";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import {
  shape_sound,
  shape1,
  shape2,
  shape1_morphed,
  shape2_morphed,
} from "./paths";

export default function MuteSvg({ mute, handleToggleMute }) {
  return (
    <div style={{ cursor: "pointer" }} onClick={handleToggleMute}>
      <svg
        width="78"
        height="64"
        viewBox="0 0 78 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SVGMorph paths={[shape1, shape1_morphed, shape1]} mute={mute} />
        <SVGMorph paths={[shape2, shape2_morphed, shape2]} mute={mute} />
        <path d={shape_sound} fill="black" />
      </svg>
    </div>
  );
}

function SVGMorph({ paths, mute }) {
  const [indexOfPath, setIndexOfPath] = useState(0);
  const progress = useMotionValue(0);
  const getIndex = paths.map((_, i) => i);
  const path = useTransform(progress, getIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  const handleToggleMute = () => {
    animate(progress, indexOfPath, {
      duration: 0.5,
      ease: "easeInOut",
      onComplete: () => {
        if (indexOfPath === paths.length - 1) {
          setIndexOfPath(1);
          progress.set(0);
        } else {
          setIndexOfPath(indexOfPath + 1);
        }
      },
    });
  };

  useEffect(() => {
    handleToggleMute();
  }, [mute]);

  return (
    <motion.path
      d={path}
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );
}
