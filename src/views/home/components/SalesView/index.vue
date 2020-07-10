<template>
  <div class="sales-view">
    <el-card shadow="hover" :body-style="{ padding: '0 0 20px 0' }">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            class="sales-view-menu"
            mode="horizontal"
            :default-active="activeIndex"
            @select="onMenuSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>

          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>

            <el-date-picker
              class="sales-view-date-picker"
              type="daterange"
              v-model="date"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              unlink-panels
              :picker-options="pickerOptions"
            />
          </div>
        </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options="chartOptions" />
          <div class="sales-view-list">
            <div class="sales-view-title">排行榜</div>
            <div class="list-item-wrapper">
              <div class="list-item" v-for="item in rankData" :key="item.no">
                <div :class="['list-item-no', item.no <= 3 ? 'top-no' : '']">{{item.no}}</div>
                <div class="list-item-name">{{item.name}}</div>
                <div class="list-item-money">{{item.money}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  mixins: [commonDataMixin],
  data () {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      chartOptions: {}
    }
  },
  computed: {
    rankData () {
      return this.activeIndex === '1' ? this.orderRank : this.userRank
    }
  },
  watch: {
    orderFullYear: {
      handler (value) {
        this.renderChart(value, this.orderFullYearAxis, '年度销售额')
      },
      immediate: true
    }
  },
  methods: {
    onMenuSelect (index) {
      this.activeIndex = index
      index === '1' ? this.renderChart(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
        : this.renderChart(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
    },
    renderChart (data, axis, title) {
      this.chartOptions = {
        title: {
          text: title,
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#999'
            },
            alignWithLabel: true
          },
          data: axis
        },
        yAxis: {
          axisLine: { // 轴线
            show: false
          },
          axisTick: { // 刻度尺
            show: false
          },
          splitLine: { // 分割线
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [
          {
            name: title,
            type: 'bar',
            barWidth: '30%',
            data
          }
        ],
        color: ['#3398DB'],
        grid: {
          left: 60,
          right: 60,
          top: 70,
          bottom: 50
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sales-view {
    margin-top: 20px;
    .menu-wrapper {
      display: flex;
      position: relative;
      .sales-view-menu {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        .el-menu-item {
          height: 50px;
          line-height: 50px;
          margin: 0 20px;
        }
      }
      .menu-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        right: 20px;
        height: 50px;
        .sales-view-date-picker {
          margin-left: 20px;
        }
      }
    }
    .sales-view-chart-wrapper {
      display: flex;
      height: 270px;
      .echarts {
        flex: 0 0 70%;
        width: 70%;
        height: 100%;
      }
      .sales-view-list {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .sales-view-title {
          margin-top: 20px;
          font-size: 12px;
          color: #666666;
          font-weight: 500;
        }
        .list-item-wrapper {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .list-item {
            display: flex;
            align-items: center;
            font-size: 12px;
            padding: 6px 20px 6px 0;
            &-no {
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              color: #333333;
              &.top-no {
                color: #ffffff;
                border-radius: 50%;
                background-color: #000000;
                font-weight: 500;
              }
            }
            &-name {
              margin-left: 10px;
              color: #333333;
            }
            &-money {
              flex: 1;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
