
const lobbyRouter = [
  {
    path: "/Lobby",
    name: "Lobby",
    component: () => import(/* webpackChunkName: "Investigation" */ '@/views/Lobby/Lobby.vue'),
    redirect: '/Lobby/LobbyHome',//页面默认加载的路由
    children: [
      {
        path: "/Lobby/LobbyHome",
        name: "/Lobby/LobbyHome",
        component: () => import(/* webpackChunkName: "Investigation" */ '@/views/Lobby/LobbyRoom.vue'),
      },
    ]
  },
]
export default lobbyRouter
