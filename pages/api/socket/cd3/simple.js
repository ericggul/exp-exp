export default function simpleSetup({ socket, io }) {
  //init
  socket.on("simple-mobile-init", () => {
    socket.join("simple");
    socket.join("simple-mobile");
  });

  socket.on("simple-screen-init", () => {
    socket.join("simple");
    socket.join("simple-screen");
  });

  socket.on("simple-new-action", (data) => {
    socket.to("simple").emit("new-simple-action", data);
  });
}
