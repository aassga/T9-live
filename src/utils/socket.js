import Vue from "vue";
const wsUrl = `${process.env.VUE_APP_SOCKET_URL}?token=${"123"}&tokenid=${"123"}&vid=${"123"}`;//動態環境
// const wsUrl = "ws://test.hichat3rd.tools/ws/im/echo";//模擬環境
var socket = new WebSocket(wsUrl);
const emitter = new Vue({
  methods: {
    send(message) {
      if (socket.readyState === 1)socket.send(JSON.stringify(message));
    },
    // 初始化 websocket 
    connect() {
      socket = new WebSocket(wsUrl);
      socket.onmessage = function (msg) {
        let messageData = JSON.parse(msg.data)
        let chatType = messageData.chatType
        switch (chatType) {

        }
        emitter.$emit("message", msg.data);
      };
      socket.onerror = function (err) {
        emitter.$emit("error", err);
      };
      socket.onclose = function (e) {
        console.log("<--【连线斷開】------自動重新連線-->");
        emitter.connect();
      };
    },
  }
});
// emitter.connect();
export default emitter;