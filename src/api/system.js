import { axios } from '../libs/axios/api.request'

//登录
export const memberInfo = data => {
  let postData = {
    url: '/api/LobbyClient/member_info',
    method: 'post',
    data
  }
  return axios.request(postData)
}

