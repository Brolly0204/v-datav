<template>
  <ve-bmap
    :settings="chartSettings"
    :series="chartSeries"
    :tooltip="tooltip"
    height="100%"
  />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

const convertData = function (data, geo) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geo[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

export default {
  mixins: [commonDataMixin],
  data () {
    return {
      chartSettings: {
        key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd'
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999'
                }
              }
            ]
          }
        }
      },
      chartSeries: [],
      tooltip: {}
    }
  },
  watch: {
    mapData: {
      handler (val) {
        if (val && val.data) {
          const { data, geo } = val
          this.chartSeries = [
            {
              name: '销售额',
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data, geo),
              symbolSize: val => {
                return val[2] / 10
              },
              encode: {
                value: 2
              },
              itemStyle: {
                color: 'purple'
              },
              label: {
                show: false,
                position: 'top',
                formatter (val) {
                  return val.data.name
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: convertData(
                data
                  .sort((a, b) => {
                    return b.value - a.value
                  })
                  .slice(0, 5)
                , geo
              ),
              symbolSize (val) {
                return val[2] / 10
              },
              encode: {
                value: 2
              },
              itemStyle: {
                color: 'purple',
                shadowBlur: 10,
                shadowColor: '#333'
              },
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              hoverAnimation: true
            }
          ]
        }
      },
      immediate: true
    }
  }
}
</script>
