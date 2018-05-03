import request from '@/utils/request'

export function fetchDailysummary() {
  return request({
    url: '/dailysummary/listBySid',
    method: 'get'
  })
}

