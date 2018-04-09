import request from '@/utils/request'

export function bulletin() {
  return request({
    url: '/bulletin/bulletin',
    method: 'get'
  })
}
