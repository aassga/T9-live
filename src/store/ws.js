export const state = {
  playerInfo:{
    AccountType: 1,
    GetBroadCast: true,
  },
  gameList:[],
  tableList:[],
  bannerList:[],
};
export const actions = {

};

export const mutations = {
  SET_PLAYER_INFO(state, playerInfo) {
    state.playerInfo = playerInfo;
  },
  SET_GAME_LIST(state, gameList) {
    state.gameList = gameList;
  },
  SET_TABLE_LIST(state, tableList) {
    state.tableList = tableList;
  },
  SET_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList;
  },  
};
export const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};