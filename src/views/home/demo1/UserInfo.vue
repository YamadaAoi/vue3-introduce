<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 01:16:11
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 01:53:26
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
</template>

<script setup lang="ts">
import { bbox, Feature, FeatureCollection } from '@turf/turf'
import { LngLatBounds, Map } from 'maplibre-gl'
import { NPopover } from 'naive-ui'
import { onMounted, ref, toRefs, watch } from 'vue'
import { getDataById } from './user_info_api'

const props = defineProps<{
  user: string
  map?: Map
}>()
const { user } = toRefs(props)
const foots = ref<string[]>([])
const curFoot = ref<string>()
const geojson = ref<FeatureCollection>({
  type: 'FeatureCollection',
  features: []
})

onMounted(() => {
  if (props.map) {
    props.map.addSource('footSource', {
      type: 'geojson',
      data: geojson.value
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
  }
})

watch(
  user,
  next => {
    if (next) {
      getFoot(next).catch(err => {
        console.error(err)
      })
    }
  },
  { immediate: true }
)

watch(
  curFoot,
  next => {
    if (next) {
      getGeo(next).catch(err => {
        console.error(err)
      })
    }
  },
  { immediate: true }
)

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

async function getFoot(userId: string) {
  const resp = await getDataById(userId)
  if (resp?.data) {
    foots.value = resp.data.foots ?? []
  }
}

async function getGeo(id: string) {
  const resp = await getDataById(id)
  if (resp?.data?.type === 'Feature') {
    setData(resp.data as Feature)
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
