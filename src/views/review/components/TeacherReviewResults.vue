<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    classTeacherAssessment: {
      type: Array,
      default: null
    },
    lecturerAssessment: {
      type: Array,
      default: null
    },
    assistantAssessment: {
      type: Array,
      default: null
    },
    studentAssessment: {
      type: Array,
      default: null
    },
    selfAssessment: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '学习能力', max: 100 },
            { name: '项目开发能力', max: 100 },
            { name: '日常表现', max: 100 },
            { name: '素质素养', max: 100 },
            { name: '沟通能力', max: 100 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['班主任评定', '讲师评定', '助教评定', '学生评定', '学生自评']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: this.classTeacherAssessment,
              name: '班主任评定'
            },
            {
              value: this.lecturerAssessment,
              name: '讲师评定'
            },
            {
              value: this.assistantAssessment,
              name: '助教评定'
            },
            {
              value: this.studentAssessment,
              name: '学生评定'
            },
            {
              value: this.selfAssessment,
              name: '学生自评'
            }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
