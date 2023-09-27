
const lobbyRouter = [
  {
    path: "/Lobby",
    name: "Lobby",
    component: () => import(/* webpackChunkName: "Investigation" */ '@/views/Lobby/Lobby.vue'),
  },
]
export default lobbyRouter
