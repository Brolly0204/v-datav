<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from '@/components/TopView'
import SalesView from '@/components/SalesView'
import BottomView from '@/components/BottomView'
import MapView from '@/components/MapView'
import { screenData } from '@/api'

export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  data () {
    return {
      reportData: null
    }
  },
  provide () {
    return {
      getReportData: this.getReportData
    }
  },
  methods: {
    getReportData () {
      return this.reportData
    }
  },
  mounted () {
    screenData().then(data => {
      console.log('data', data)
      this.reportData = data
    })
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  padding: 20px;
  background-color: #eee;
  box-sizing: border-box;
}
</style>
