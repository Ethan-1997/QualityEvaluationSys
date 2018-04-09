import request from '@/utils/request'

export function daliyTask() {
  return request({
    url: '/daliyTask/daliyTask',
    method: 'post'
  })
}

