import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}
