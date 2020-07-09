<template>
  <ve-wordcloud
    :data="chartData"
    :settings="chartSetting"
    height="100%"
  />
</template>

<script>
export default {
  data () {
    return {
      chartData: {
        columns: ['name', 'value'],
        rows: [
          {
            name: 'visualMap',
            value: 22199
          },
          {
            name: 'continuous',
            value: 10288
          },
          {
            name: 'contoller',
            value: 620
          },
          {
            name: 'series',
            value: 274470
          },
          {
            name: 'gauge',
            value: 12311
          }
        ]
      },
      chartSetting: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  }
}
</script>
