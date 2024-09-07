import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={audioSrc} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
