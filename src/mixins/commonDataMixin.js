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

const wrapperObject = (o, k) => {
  if (o && k.indexOf('.') > 0) {
    const keys = k.split('.')
    keys.forEach(key => {
      o = o[key]
    })
    return o || {}
  } else {
    return o && o[k] ? o[k] : {}
  }
}

export default {
  inject: ['getReportData', 'getWordCloud', 'getMapData'],
  filters: {
    format (v) {
      return format(v)
    }
  },
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
      return wrapperNumber(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperNumber(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth () {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userTodayNumber () {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    },
    userFullYear () {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis () {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank () {
      return wrapperArray(this.reportData, 'userRank')
    },
    orderFullYear () {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis () {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank () {
      return wrapperArray(this.reportData, 'orderRank')
    },
    category1 () {
      return wrapperObject(this.reportData, 'category.data1')
    },
    category2 () {
      return wrapperObject(this.reportData, 'category.data2')
    },
    wordCloud () {
      return this.getWordCloud()
    },
    mapData () {
      return this.getMapData()
    }
  }
}
