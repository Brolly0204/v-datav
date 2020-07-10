<template>
  <div class="today-users">
    <common-card
      title="今日交易用户"
      :value="orderUser"
    >
      <template>
        <v-chart :options="getOptions()" />
      </template>
      <template v-slot:footer>
        <span>退货率 </span>
        <span class="emphasis">{{returnRate}}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'TodayUsers',
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions () {
      return {
        xAxis: {
          type: 'category',
          show: false,
          data: this.orderUserTrendAxis
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '用户实时交易量',
            type: 'bar',
            data: this.orderUserTrend,
            barWidth: '60%'
          }
        ],
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        color: ['#3398DB'],
        tooltip: {
          // trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              formatter (obj) {
                console.log(obj)
                return '直接访问'
              }
            }
          }
        }
      }
    }
  }
}
</script>
