<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{userCount | format}}</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{searchCount | format}}</div>
                <v-chart :options="searchNumberOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="160" />
                <el-table-column prop="keyword" label="关键词" width="160" />
                <el-table-column prop="count" label="搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="range" label="点击率" />
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                background
                @current-change="onPageChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size="small" @change="onCategoryChange">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions"/>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']

export default {
  mixins: [commonDataMixin],
  data () {
    return {
      searchUserOption: {},
      searchNumberOption: {},
      categoryOptions: {},
      totalData: [],
      tableData: [],
      radioSelect: '品类',
      total: 0,
      pageSize: 4
    }
  },
  computed: {
    userCount () {
      return this.totalData.reduce((s, i) => i.users + s, 0) || 0
    },
    searchCount () {
      return this.totalData.reduce((s, i) => i.count + s, 0) || 0
    }
  },
  watch: {
    wordCloud: {
      handler (val = []) {
        if (!val) return
        const tableData = []
        val.forEach((item, index) => {
          tableData.push({
            id: index + 1,
            rank: index + 1,
            count: item.count,
            users: item.user,
            keyword: item.word,
            range: `${(item.user / item.count * 100).toFixed(2)}%`
          })
        })
        this.totalData = tableData
        this.total = tableData.length
        this.renderTable(1)
        this.renderLineChart()
      },
      immediate: true
    },
    category1 () {
      this.renderPieChart()
    }
  },
  methods: {
    renderTable (page) {
      this.tableData = this.totalData.slice((page - 1) * this.pageSize, page * this.pageSize)
    },
    onPageChange (page) {
      this.renderTable(page)
    },
    renderPieChart () {
      if (!this.category1.data1 || !this.category2.data2) {
        return
      }
      let data
      let axisX
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1
        axisX = this.category1.axisX
        total = data.reduce((t, i) => (t += i), 0)
      } else {
        data = this.category2.data1
        axisX = this.category2.axisX
        total = data.reduce((t, i) => (t += i), 0)
      }

      const chartData = []
      data.slice(0, 6).forEach((item, index) => {
        const percent = `${((item / total) * 100).toFixed(2)}%`
        chartData.push({
          name: `${axisX[index]} | ${percent}`, // 配合legend使用
          legendName: axisX[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index]
          }
        })
      })
      this.categoryOptions = {
        title: [
          {
            text: `${this.radioSelect}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            subtext: total,
            x: '34.5%',
            y: '42.5%',
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            }
          }
        ],
        series: [
          {
            name: `${this.radioSelect}`,
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['35%', '50%'],
            label: {
              show: true,
              position: 'outside',
              formatter (params) {
                // return `${params.data.legendName} | ${params.percent}%`
                return params.data.legendName
              }
            },
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            },
            labelLine: {
              show: true,
              length: 6,
              length2: 4,
              smooth: true
            },
            clockwise: true,
            data: chartData
          }
        ],
        legend: {
          orient: 'vertical',
          top: 'middle',
          left: '70%',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter (params) {
            return `
              ${params.seriesName}
              </br>
              ${params.marker}${params.data.legendName}
              </br>
              数量：${params.data.value}
              </br>
              占比：${params.data.percent}
            `
          }
        }
      }
    },
    renderLineChart () {
      this.searchUserOption = this.createOption('user')
      this.searchNumberOption = this.createOption('count')
    },
    createOption (key) {
      const data = this.wordCloud.map(i => i[key])
      const axis = this.wordCloud.map(i => i.word)
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: axis
        },
        yAxis: {
          show: false
        },
        tooltip: {},
        series: [
          {
            type: 'line',
            data,
            areaStyle: {
              color: 'rgba(95, 197, 255, .5)'
            },
            itemStyle: {
              opacity: 0
            },
            lineStyle: {
              color: 'rgba(95, 197, 255)'
            }
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    onCategoryChange (type) {
      // this.radioSelect = type
      this.renderPieChart()
    }
  },
  mounted () {
    this.renderPieChart()
  }
}
</script>

<style lang="scss" scoped>
  .bottom-view {
    display: flex;
    margin-top: 20px;

    .view {
      flex: 1;
      width: 50%;
      box-sizing: border-box;

      &:first-child {
        padding-right: 10px;
      }

      &:last-child {
        padding-left: 10px;
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        height: 60px;
        padding-left: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        font-weight: 500;

        .radio-wrapper {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          padding-right: 20px;
        }
      }

      .chart-wrapper {
        display: flex;
        flex-direction: column;
        height: 452px;

        .chart-inner {
          display: flex;
          margin-top: 20px;
          padding: 0 10px;

          .chart {
            flex: 1;
            padding: 0 10px;

            .chart-title {
              font-size: 12px;
              color: #999999;
            }

            .chart-data {
              margin-top: 5px;
              font-size: 22px;
              color: #333333;
              font-weight: 500;
              letter-spacing: 2px;
            }

            .echarts {
              height: 50px;
            }
          }
        }

        .table-wrapper {
          flex: 1;
          padding: 0 20px 20px;

          .el-pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
