import { Component, markRaw } from 'vue'
import ResourceList from './resourceList/ResourceList'
import InfoFetch from './infoFetch/InfoFetch.vue'
import resource1 from '../../../assets/home/resource1.png'
import resource2 from '../../../assets/home/resource2.png'
import resource3 from '../../../assets/home/resource3.png'
import info1 from '../../../assets/home/info1.png'
import info2 from '../../../assets/home/info2.png'

export interface MapMenu {
  label: string
  value: string
  icon1: string
  icon2: string
  icon3: string
  component: Component
  chosen?: boolean
}

export function getMapMenus() {
  const menus: MapMenu[] = [
    {
      label: '资源目录',
      value: 'resource',
      icon1: resource1,
      icon2: resource2,
      icon3: resource3,
      component: markRaw(ResourceList),
      chosen: true
    },
    {
      label: '信息查询',
      value: 'info',
      icon1: info1,
      icon2: info2,
      icon3: resource3,
      component: markRaw(InfoFetch)
    }
  ]
  return menus
}
