import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

//uuid
import { v4 as uuidv4 } from "uuid";
import useSocket from "utils/hooks/socket/id430/mobile-letter/useSocketMobile";

import Tracker from "./tracker";

export default function Component() {
  const [requestPermission, setRequestPermission] = useState(false);
  const socket = useSocket();
  const [orientationData, setOrientationData] = useState({ alpha: 0, beta: 0, gamma: 0 });

  const mobileId = useMemo(() => uuidv4(), []);
  const [text, setText] = useState("");
  const [color, setColor] = useState("pink");

  useEffect(() => {
    if (socket && socket.current) {
      socket.current.emit("mobile-letter-new-text", { text, mobileId, color });
    }
  }, [text, color]);

  return (
    <S.Container>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here..." />
      <p>Color Picker</p>
      <input
        type="color"
        //custom styling
        style={{
          width: "150px",
          height: "150px",
          cursor: "pointer",
          // border: "1px solid white",
          boxShadow: "0 0 10px 2px rgba(255, 255, 255, 1)",
        }}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Tracker requestPermission={requestPermission} setRequestPermission={setRequestPermission} socket={socket} setOrientationData={setOrientationData} />
    </S.Container>
  );
}
