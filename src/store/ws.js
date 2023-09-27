export const state = {
  playerInfo:{
    AccountType: 1,
    AgentId: 2,
    Balance: 0,
    Bet_Status: 1,
    ChipSet: [100, 1000, 5000, 10000, 50000, 100000],
    Currency: 1,
    CustomizeChips: "2000,2000,5000,10000,50000,100000",
    GetBroadCast: true,
    GiftStatus: 1,
    IdleRoundStatus: 1,
    LiveRollingRate: 0,
    MaxBetLimit: 0,
    MaxLoseAmountLimit: 0,
    MaxWinAmountLimit: 0,
    MemberId: 9,
    MemberName: "test6",
    MiniBetLimit: 0,
    Mute: 0,
    NickName: "null",
    Status: 1,
    SumPayout:-47195,
    Totally_Disabled: 0,
    WeeklyLossSettlement: 1,
    liveTableList: []
  },
  gameList:[],
};
export const actions = {};

export const mutations = {
  setPlayerInfo(state, playerInfo) {
    state.playerInfo = playerInfo;
  },
  setGameList(state, gameList) {
    state.gameList = gameList;
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