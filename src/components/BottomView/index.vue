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
                <div class="chart-data">126,233</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">230,465</div>
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
                :page-size="4"
                :total="100"
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
              <el-radio-group v-model="radioSelect" size="small">
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
export default {
  data () {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: [280, 220, 100, 120, 300, 200, 180, 140, 160, 90, 80],
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
      },
      searchNumberOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: [180, 140, 160, 90, 80, 280, 220, 100, 120, 300, 200],
            areaStyle: {
              color: 'rgba(95, 197, 255, .5)'
            },
            itemStyle: {
              opacity: 0
            },
            lineStyle: {
              color: 'rgba(95, 197, 255)'
            },
            smooth: true
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      categoryOptions: {},
      tableData: [
        {
          id: 1,
          rank: 1,
          keyword: '北京',
          count: 3382,
          users: 95,
          range: '95%'
        },
        {
          id: 2,
          rank: 2,
          keyword: '北京',
          count: 3382,
          users: 95,
          range: '95%'
        },
        {
          id: 3,
          rank: 3,
          keyword: '北京',
          count: 3382,
          users: 95,
          range: '95%'
        },
        {
          id: 4,
          rank: 4,
          keyword: '北京',
          count: 3382,
          users: 95,
          range: '95%'
        },
        {
          id: 5,
          rank: 5,
          keyword: '北京',
          count: 3382,
          users: 95,
          range: '95%'
        }
      ],
      radioSelect: '品类'
    }
  },
  methods: {
    onPageChange (page) {
      console.log(page)
    },
    renderPieChart () {
      this.categoryOptions = {
        title: [
          {
            text: '品类分布',
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            subtext: '320',
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
            data: [
              {
                name: '粉面粥店 | 15.40%', // 配合legend使用
                legendName: '粉面粥店',
                value: 67,
                percent: '15.40',
                itemStyle: {
                  color: '#e7e702'
                }
              },
              {
                name: '简餐便当 | 22.30%',
                legendName: '简餐便当',
                value: 97,
                percent: '22.30',
                itemStyle: {
                  color: '#8d7fec'
                }
              },
              {
                name: '汉堡披萨 | 21.15%',
                legendName: '汉堡披萨',
                value: 92,
                percent: '21.15',
                itemStyle: {
                  color: '#5085f2'
                }
              }
            ]
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
            console.log(params)
            return `
              标题
              </br>
              ${params.marker}${params.data.legendName}
              </br>
              数量：${params.data.value}
              </br>
              占比：${params.data.percent}%
            `
          }
        }
      }
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
