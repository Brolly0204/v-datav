import { request } from '@/plugins/axios'

export const screenData = () => {
  return request('/screen/data')
}

export const mapScatter = () => {
  return request('/screen/map/scatter')
}

export const wordCloud = () => {
  return request('/screen/wordcloud')
}

export const screenMap = () => {
  return request('/screen/map')
}
