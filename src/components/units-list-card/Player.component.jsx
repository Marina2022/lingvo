import React, { useState, useEffect } from "react";

const useAudio = (url) => {
   const [audio] = useState(new Audio(url));
   const [playing, setPlaying] = useState(false);

   const toggle = () => setPlaying(!playing);

   useEffect(() => {
      playing ? audio.play() : audio.pause();
      //eslint-disable-next-line
   }, [playing]);

   useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
         audio.removeEventListener("ended", () => setPlaying(false));
      };
      //eslint-disable-next-line
   }, []);

   return [toggle, playing];
};

const Player = ({ url, children }) => {
   const [toggle] = useAudio(url);

   return <div onClick={toggle}>{children}</div>;
};

export default Player;
