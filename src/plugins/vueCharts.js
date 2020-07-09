import Vue from 'vue'
import VueEcharts from 'vue-echarts'

// 全量导入
// import Echarts from 'echarts'
// Vue.prototype.$echarts = Echarts

// 按需引入
// 图表
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/custom'
import 'echarts/lib/chart/pie'

// 组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

Vue.component('v-chart', VueEcharts)
