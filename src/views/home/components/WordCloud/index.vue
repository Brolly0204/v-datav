<template>
  <ve-wordcloud
    :data="chartData"
    :settings="chartSetting"
    height="100%"
  />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  mixins: [commonDataMixin],
  data () {
    return {
      chartData: {},
      chartSetting: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  },
  watch: {
    wordCloud: {
      handler (val) {
        if (val) {
          const rows = []
          val.forEach(item => {
            rows.push({
              name: item.word,
              value: item.count
            })
          })
          this.chartData = {
            columns: ['name', 'value'],
            rows
          }
        }
      },
      immediate: true
    }
  }
}
</script>
