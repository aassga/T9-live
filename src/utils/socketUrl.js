
import { login } from "@/api/index";

export function getSocketUrl() {
  const socketUrlList = JSON.parse(localStorage.getItem('socketUrlListL'))
  const initSokcetUrl = process.env.VUE_APP_SOCKET_URL+'/api' + socketUrlList[0]
  const newSocketUrlList = socketUrlList.filter(res => res !== socketUrlList[0])
  localStorage.setItem('socketUrlListL',JSON.stringify(newSocketUrlList))
  return initSokcetUrl
}

export function getSocketList() {
  const device = localStorage.getItem("device");
  const token = localStorage.getItem("token");
  let parmas = {
    Device: device === "mobile" ? '1' : '0',
    Token:token,
  };
  login(parmas).then((res) => {
    if(res.Error === 0){
      const socktList = res.Data.ConnectIds
      localStorage.setItem('socketUrlListL',JSON.stringify(socktList))
    }
  });
}