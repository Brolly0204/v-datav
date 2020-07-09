const format = v => {
  // return parseFloat(v).toLocaleString()
  const reg = /\d{1,3}(?=(\d{3})+(\.\d+)?$)/g
  return `${v}`.replace(reg, '$&,')
}

const wrapperMoney = (o, k) => {
  return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00'
}

const wrapperNumber = (o, k) => {
  return o && o[k] ? format(o[k]) : 0
}

const wrapperOriginalNumber = (o, k) => {
  return o && o[k] ? o[k] : 0
}

const wrapperPercentage = (o, k) => {
  return o && o[k] ? `${o[k]}%` : '0%'
}

const wrapperArray = (o, k) => {
  return o && o[k] ? o[k] : []
}

export default {
  inject: ['getReportData'],
  computed: {
    reportData () {
      return this.getReportData()
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay () {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend () {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser () {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    orderUserTrend () {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis () {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    returnRate () {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    userToday () {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth () {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userTodayNumber () {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    }
  }
}
