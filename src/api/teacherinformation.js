import request from '@/utils/request'

export function updateInformation(data) {
  return request({
    url: '/teacherinformation/updateInformation',
    method: 'post',
    data
  })
}
export default function fetchList() {
  return request({
    url: '/teacherinformation/fetchInformation',
    method: 'post'
  })
}
