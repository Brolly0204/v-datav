<template>
  <div class="total-orders">
    <common-card
      title="累计订单量"
      :value="orderToday"
    >
      <template>
        <v-chart :options="getOptions()"/>
      </template>
      <template v-slot:footer>
        <span>昨日订单量 </span>
        <span class="emphasis">{{orderLastDay}}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'
import commonDataMixin from '../../mixins/commonDataMixin'

export default {
  name: 'TotalOrders',
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions () {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show: false
        },
        yAxis: {
          // min: 0,
          // max: 200,
          show: false
        },
        series: [
          {
            type: 'line',
            data: this.orderTrend,
            smooth: true,
            lineStyle: {
              width: 0
            },
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              color: 'purple'
            }
          }
        ],
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    }
  }
}
</script>
