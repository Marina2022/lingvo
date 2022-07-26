import React, { useState, useEffect } from "react";

const useAudio = (url) => {
   const [audio] = useState(new Audio(url));
   const [playing, setPlaying] = useState(false);

   const toggle = () => setPlaying(!playing);

   useEffect(() => {
      playing ? audio.play() : audio.pause();
   }, [audio, playing]);

   useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
         audio.removeEventListener("ended", () => setPlaying(false));
      };
   }, [audio]);

   return [toggle, playing];
};

const Player = ({ url, files, children, title }) => {
   const _url = url ? url : files ? files[0].url : undefined;

   const [toggle] = useAudio(_url);

   return <div className="unit-action" onClick={toggle} title={title}>{children}</div>;
};

export default Player;
