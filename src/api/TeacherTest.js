import request from '@/utils/request'

export function fetchListTeacherTest(query) { // 根据Tno来查找TT里老师制作的试卷
  return request({
    url: '/tt/getByExample',
    method: 'get',
    params: query
  })
}

export function createTeacherTest(data) { // 往TT添加数据
  return request({
    url: '/tt/create',
    method: 'post',
    params: data
  })
}

export function updateTeacherTest(data) { // 根据Tid来更新信息TT
  return request({
    url: '/tt/update',
    method: 'post',
    params: data
  })
}
export function deleteTeacherTest(data) { // 根据Tid来删除TT里试卷信息
  return request({
    url: '/tt/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
