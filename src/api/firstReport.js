import request from '@/utils/request'

export function fetchListFirstReport() {
  return request({
    url: '/firstReport/list',
    method: 'get'
  })
}
