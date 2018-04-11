import request from '@/utils/request'

export function daliyTask() {
  return request({
    url: '/daliyTask/daliyTask',
    method: 'post'
  })
}

export function createDailyTask(data) {
  return request({
    url: '/daliyTask/create',
    method: 'post',
    data
  })
}

export function updateDailyTask(data) {
  return request({
    url: '/daliyTask/update',
    method: 'post',
    data
  })
}

