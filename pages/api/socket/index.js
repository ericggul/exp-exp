import { Server } from "socket.io";

//three.js
import mobileRotation1Setup from "./id430/mobile-rotation-1";
import mobileRotation2Setup from "./id430/mobile-rotation-2";
import mobileLetterSetup from "./id430/mobile-letter";
import mobileScrollSetup from "./id430/mobile-scroll";
import mobileAudioSetup from "./id430/mobile-audio";

//id412 w2
import simpleSetup from "./id412/simple";

//convd4 w10
import w10Setup from "./convd4/w10";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("socket already enabled");
    res.end();
    return;
  } else {
    console.log("socket enabled");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      //mobile rotation 1
      mobileRotation1Setup({ socket, io });
      //mobile rotation 2
      mobileRotation2Setup({ socket, io });
      //mobile letter
      mobileLetterSetup({ socket, io });
      //mobile scroll
      mobileScrollSetup({ socket, io });
      //mobile audio
      mobileAudioSetup({ socket, io });
      //simple
      simpleSetup({ socket, io });
      //w10
      w10Setup({ socket, io });
    });
  }

  res.end();
}
