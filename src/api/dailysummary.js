import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/dailysummary/list',
    method: 'get'
  })
}
