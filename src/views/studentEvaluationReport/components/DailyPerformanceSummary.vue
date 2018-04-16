<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
    firstData: {
      type: Number,
      default: 0
    },
    secondData: {
      type: Number,
      default: 0
    },
    thirdlyData: {
      type: Number,
      default: 0
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
    console.log(this.$nextTick)
    this.$nextTick(() => {
      this.chart.resize()
      console.log(123123)
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
          data: ['违纪表现', '突出表现', '重大事项'],
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
          name: '违纪表现',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [this.firstData, 0, 0],
          animationDuration
        }, {
          name: '突出表现',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, this.secondData, 0],
          animationDuration
        }, {
          name: '重大事项',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, 0, this.thirdlyData],
          animationDuration
        }]
      })
    }
  }
}
</script>
