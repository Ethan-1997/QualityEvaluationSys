<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { fetchListStudentGrade } from '@/api/StudentGrade'
import { getCurrentUser } from '@/api/user'
const animationDuration = 6000

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
    thinkingData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      iitem: [0, 0, 45]
    }
  },
  mounted() {
    this.initChart()
    this.getList()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
    this.$nextTick(() => {
      this.chart.resize()
    })
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
    getList() {
      getCurrentUser().then(response => {
        const data = { Sid: response.data.user.sid }
        fetchListStudentGrade(data).then(response => {
          const value1 = JSON.parse(response.data.items[0].thinking)
          this.thinkingData = [value1[2], value1[1], value1[3]]
          this.initChart()
          debugger
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['正确', '错误', '总数'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.thinkingData,
          animationDuration
        }]
      })
    }
  }
}
</script>
