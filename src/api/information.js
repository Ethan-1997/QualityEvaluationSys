import request from '@/utils/request'
export default function updateInformation(data) {
  return request({
    url: '/information/update',
    method: 'post',
    data
  })
}
export function updateStudentTeam(data) {
  return request({
    url: '/studentTeam/update',
    method: 'post',
    data
  })
}
export function fetchList() {
  return request({
    url: '/information/getList',
    method: 'post'
  })
}
