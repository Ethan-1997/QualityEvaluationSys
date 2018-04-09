const infor = {
  classname: 'vue.js',
  back: '中共党员',
  time: '1990年5月10日',
  phone: '12345678910',
  home: '杭州临安',
  intro: '特级教师  座右铭：服务学生，在学生中体验价值和尊重。'
}
export default {
  getList: () => {
    return {
      items: infor
    }
  },
  updateInformation: function(tempList) {
    console.log(1)
    console.log(tempList)
    const temp = JSON.parse(tempList.body)
    infor.classname = temp.classname
    infor.time = temp.time
    infor.back = temp.back
    infor.phone = temp.phone
    infor.home = temp.home
    infor.intro = temp.intro
  }
}
