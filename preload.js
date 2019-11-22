// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const io = require('socket.io-client');
const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);

socket.on('welcome', () => {
  console.log('on welcome : welcome received renderer'); // displayed
  socket.emit('test')
});
socket.on('error', (e) => {
  console.log(e); // not displayed
});
socket.on('ok', () => {
  console.log("OK received renderer"); // not displayed
});
socket.on('connect', () => {
  console.log("connected renderer"); // displayed
  socket.emit('test');
});