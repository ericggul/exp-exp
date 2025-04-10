import * as S from "./styles";
import { useState, useEffect, useRef } from "react";
import useDeviceOrientation from "utils/hooks/useDeviceOrientation";

export default function Tracker({ requestPermission, setRequestPermission, socket, setOrientationData }) {
  return (
    <>
      <TrackerEl requestPermission={requestPermission} socket={socket} setOrientationData={setOrientationData} />
      {!requestPermission && (
        <S.Start
          onClick={() => {
            if (!requestPermission) {
              setRequestPermission(true);
            }
          }}
        >
          {"Click to Start"}
        </S.Start>
      )}
    </>
  );
}

function TrackerEl({ requestPermission, socket, setOrientationData }) {
  const { permission, orientation } = useDeviceOrientation({ requestPermission });

  const orientationThenRef = useRef(Date.now());

  useEffect(() => {
    try {
      const now = Date.now();
      const diff = now - orientationThenRef.current;
      if (diff < 20) return;
      orientationThenRef.current = now;

      if (socket && socket.current && orientation) {
        setOrientationData(orientation);
        socket.current.emit("mobile-rotation-1-new-orientation", { ...orientation });
      }
    } catch (e) {
      console.log(e);
    }
  }, [orientation]);

  return <></>;
}
