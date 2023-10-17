import { axios } from '../libs/axios/api.request'

//登录
export const activityParams = data => {
  let postData = {
    url: '/acti/api/activity/params',
    method: 'post',
    data,
  }
  return axios.request(postData)
}
