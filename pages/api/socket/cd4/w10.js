export default function w10Setup({ socket, io }) {
  //init
  socket.on("w10-mobile-init", () => {
    socket.join("w10");
    socket.join("w10-mobile");
  });

  socket.on("w10-screen-init", () => {
    socket.join("w10");
    socket.join("w10-screen");
  });

  socket.on("w10-text", (data) => {
    console.log("w10 text", data);
    socket.to("w10-screen").emit("new-w10-text", data);
  });

  socket.on("w10-color", (data) => {
    console.log("w10 color", data);
    socket.to("w10-screen").emit("new-w10-color", data);
  });

  socket.on("w10-data", (data) => {
    console.log("w10 data", data);
    socket.to("w10-screen").emit("new-w10-data", data);
  });
}
