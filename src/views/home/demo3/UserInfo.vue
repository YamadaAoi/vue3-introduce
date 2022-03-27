<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 01:16:11
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:24:01
 * @Description: 用户信息
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <n-popover placement="left-start">
    <template #trigger>
      <div class="user-icon"></div>
    </template>
    <div class="user-foot">
      <template v-if="foots.length">
        <div
          v-for="(f, i) in foots"
          :key="i"
          :class="['foot-item', { 'item-chosen': curFoot === f }]"
          @click="chooseItem(f)"
        >
          {{ f }}
        </div>
      </template>
    </div>
  </n-popover>
  <map-popup :map="props.map" :lng-lat="lngLat">
    <div>市：{{ properties?.shi }}</div>
    <div>区：{{ properties?.qu }}</div>
    <div>街道：{{ properties?.jiedao }}</div>
    <div>社区：{{ properties?.shequ }}</div>
  </map-popup>
</template>

<script setup lang="ts">
import { bbox, Feature } from '@turf/turf'
import { LngLatBounds, LngLatLike, Map, MapMouseEvent } from 'maplibre-gl'
import { NPopover } from 'naive-ui'
import { onMounted, ref, toRefs } from 'vue'
import useFootGeo from '../demo2/use_foot_geo'
import useUserFoots from '../demo2/use_user_foots'
import MapPopup from './MapPopup.vue'

const props = defineProps<{
  user: string
  map?: Map
}>()
const { user } = toRefs(props)
const curFoot = ref<string>()
const { foots } = useUserFoots(user)
useFootGeo(curFoot, setData)
const lngLat = ref<LngLatLike>()
const properties = ref<any>()

onMounted(() => {
  if (props.map) {
    props.map.addSource('footSource', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: []
        },
        properties: {}
      }
    })
    props.map.addLayer({
      id: 'footLayer',
      type: 'fill',
      source: 'footSource',
      layout: {
        visibility: 'visible'
      },
      paint: {
        'fill-color': '#0000FF',
        'fill-opacity': 0.7
      }
    })
    props.map.on('click', 'footLayer', onLayerClick)
  }
})

function onLayerClick(
  e: MapMouseEvent & {
    features?: Array<Feature<any, any>> | undefined
  } & unknown
) {
  if (e.lngLat && e.features?.length) {
    lngLat.value = e.lngLat
    properties.value = e.features[0].properties
  }
}

function chooseItem(foot: string) {
  curFoot.value = foot
}

function setData(geo: Feature) {
  if (props.map && geo?.type === 'Feature') {
    const geojson: any = props.map.getSource('footSource')
    if (geojson) {
      geojson.setData(geo)
      const bounds = bbox(geo)
      if (bounds.length === 4) {
        props.map.fitBounds(
          new LngLatBounds([bounds[0], bounds[1]], [bounds[2], bounds[3]]),
          { maxZoom: 17 }
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-icon {
  width: 20px;
  height: 20px;
  background: blue;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 9;
  background-image: url('../../../assets/img/user.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
.user-foot {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  .foot-item {
    width: 40px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    margin: 8px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .item-chosen {
    border-color: blue;
    color: blue;
  }
}
</style>
