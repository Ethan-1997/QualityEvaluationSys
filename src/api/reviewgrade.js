import request from '@/utils/request'

export function fetchReviewGradeList(query) {
  return request({
    url: '/reviewgrade/list',
    method: 'get',
    params: query
  })
}

export function getReviewGrade() {
  return request({
    url: '/reviewgrade/detail',
    method: 'get'
  })
}

export function createReviewGrade(data) {
  return request({
    url: '/reviewgrade/create',
    method: 'post',
    params: data
  })
}

export function updateReviewGrade(data) {
  return request({
    url: '/reviewgrade/update',
    method: 'post',
    params: data
  })
}
export function deleteReviewGrade(data) {
  return request({
    url: '/reviewgrade/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
