import request from '@/utils/request'

export default function fetchList() {
  return request({
    url: 'api/admissionTest/Thinking/getList',
    method: 'post'
  })
}
