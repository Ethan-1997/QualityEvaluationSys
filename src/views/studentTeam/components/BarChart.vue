<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { fetchList } from '@/api/information'
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
    }
  },
  data() {
    return {
      chart: null,
      name: [],
      data: [],
      studentTeamVote: []
    }
  },
  mounted() {
    this.initChart()
    if (this.$storage.get('studentTeamVote') !== null) {
      this.studentTeamVote = this.$storage.get('studentTeamVote')
      this.init()
    } else {
      this.getList()
      this.init()
    }
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
    getList() {
      fetchList().then(Response => {
        this.studentTeamVote = Response.data.ticket
      })
    },
    init() {
      for (let i = 0; i < 7; i++) {
        this.name.push(this.studentTeamVote[i].name)
        this.data.push(this.studentTeamVote[i].votes)
      }
      this.chart.setOption({
        yAxis: [{
          type: 'category',
          data: this.name,
          axisTick: {
            alignWithLabel: true
          }
        }],
        series: [{
          name: '票数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.data,
          animationDuration
        }]
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
        yAxis: [{
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }],
        xAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '票数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 33, 95, 110, 28, 104],
          animationDuration
        }]
      })
    }
  }
}
</script>
