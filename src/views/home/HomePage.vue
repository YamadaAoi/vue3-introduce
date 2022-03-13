<template>
  <div class="mapContainer">
    <div id="mainMapView" class="map-view"></div>
    <map-menu />
  </div>
</template>

<script setup lang="ts">
import MapMenu from './mapMenu/MapMenu.vue'
</script>

<style lang="scss">
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
