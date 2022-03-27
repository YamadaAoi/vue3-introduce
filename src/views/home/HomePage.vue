<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-13 11:16:19
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 18:10:24
 * @Description: 
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <theme-provider>
    <div class="mapContainer">
      <div id="mainMapView" class="map-view"></div>
      <template v-if="loaded">
        <user-info user="u001" :map="mapView" />
        <color-change></color-change>
      </template>
    </div>
  </theme-provider>
</template>

<script setup lang="ts">
import { Map } from 'maplibre-gl'
import { onMounted, ref } from 'vue'
import UserInfo from './demo4/UserInfo.vue'
import ThemeProvider from './demo4/ThemeProvider.vue'
import ColorChange from './demo4/ColorChange.vue'

const loaded = ref(false)
const mapView = ref<Map>()

onMounted(() => {
  mapView.value = new Map({
    container: 'mainMapView', // container id
    style: '/style.json', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1 // starting zoom
  })
  mapView.value.on('load', () => {
    loaded.value = true
  })
})
</script>

<style lang="scss">
@import '../../../node_modules/maplibre-gl/dist/maplibre-gl.css';
.mapContainer {
  width: 100%;
  height: 100%;
  position: relative;
  .map-view {
    width: 100%;
    height: 100%;
  }
}
</style>
