<template>
  <ve-liquidfill
    :data="chartData"
    :settings="chartSetting"
    height="100%"
  ></ve-liquidfill>
</template>

<script>

function getColor (value) {
  return value > 0 && value <= 0.5 ? 'rgba(97,216,0,.7)'
    : value > 0.5 && value <= 0.8 ? 'rgba(204,178,26,.7)'
      : value > 0.8 ? 'rgba(241,47,28,.7)' : '#c7c7cb'
}

export default {
  data () {
    return {
      chartSetting: {},
      chartData: {
        columns: ['title', 'percent'],
        rows: [
          {
            title: 'rate',
            percent: 0.5899
          }
        ]
      }
    }
  },
  mounted () {
    this.chartSetting = {
      seriesMap: {
        rate: {
          radius: '80%',
          label: {
            formatter (v) {
              return `${Math.floor(v.data.value * 100)}%`
            },
            textStyle: {
              fontSize: 36,
              fontWeight: 'normal',
              color: '#999'
            },
            insideColor: '#fff'
          },
          outline: {
            itemStyle: {
              borderColor: '#aaa4a4',
              borderWidth: 1,
              color: 'none',
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            borderDistance: 0
          },
          backgroundStyle: {
            color: '#fff'
          },
          itemStyle: {
            shadowBlur: 0,
            shadowColor: '#fff'
          },
          amplitude: 8,
          color: [getColor(this.chartData.rows[0].percent)]
        }
      }
    }
  }
}
</script>
