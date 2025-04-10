import React, { useEffect, useRef, useMemo, useState } from "react";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";
import useSocket from "utils/hooks/socket/id430/mobile-audio/useSocketMobile";

export default function Component() {
  const socket = useSocket();
  const mobileId = useMemo(() => uuidv4(), []);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const microphoneRef = useRef(null);

  useEffect(() => {
    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Create audio context and analyser
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);

        // Set analyser properties
        analyserRef.current.fftSize = 512;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        // Function to analyse audio data and send it via socket
        const analyseAudio = () => {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const audioData = Array.from(dataArrayRef.current);
          if (socket && socket.current) {
            socket.current.emit("mobile-audio-new-data", { audioData, mobileId });
          }
        };

        // Set interval to analyse and send data every 50ms
        const intervalId = setInterval(analyseAudio, 50);

        // Cleanup function
        return () => {
          clearInterval(intervalId);
          if (microphoneRef.current) microphoneRef.current.disconnect();
          if (analyserRef.current) analyserRef.current.disconnect();
          if (audioContextRef.current) audioContextRef.current.close();
        };
      })
      .catch((err) => {
        console.error("Error accessing the microphone:", err);
      });
  }, [socket, mobileId]);

  return <S.Container></S.Container>;
}
