
import Socket from "@/utils/socket";

export function logout() {
  const removeConfig = ["token","account","password","socketUrlListL","vuex-along" ]
  removeConfig.forEach((item) =>{
    localStorage.removeItem(item)
  })
  Socket.closeWebSocket();
  window.location.reload(); // 于 Electron 应用时,会被停用
}

