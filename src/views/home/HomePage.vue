<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-13 11:16:19
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 01:52:07
 * @Description: 
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <div class="mapContainer">
    <div id="mainMapView" class="map-view"></div>
    <template v-if="loaded">
      <user-info user="u001" :map="mapView" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Map } from 'maplibre-gl'
import { onMounted, ref } from 'vue'
import UserInfo from './demo1/UserInfo.vue'

const loaded = ref(false)
const mapView = ref<Map>()

onMounted(() => {
  mapView.value = new Map({
    container: 'mainMapView', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
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
