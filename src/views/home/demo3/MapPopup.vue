<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 17:14:05
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:19:03
 * @Description: 地图弹框
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <template v-if="dom">
    <teleport :to="dom"><slot></slot></teleport>
  </template>
</template>

<script setup lang="ts">
import { Map, LngLatLike, Popup, PopupOptions } from 'maplibre-gl'
import { ref, watch } from 'vue'

const props = defineProps<{
  map?: Map
  lngLat?: LngLatLike
  options?: PopupOptions
}>()

let defaultOptions: PopupOptions = {
  closeButton: false,
  closeOnClick: false,
  closeOnMove: false
}
if (props.options) {
  defaultOptions = { ...defaultOptions, ...props.options }
}
const popup = ref(new Popup(defaultOptions).setMaxWidth('none').setHTML(''))
const dom = ref(popup.value._content)

watch(
  () => props.lngLat,
  next => {
    if (next) {
      popup.value.setLngLat(next)
      if (props.map && !popup.value.isOpen()) {
        popup.value.addTo(props.map)
      }
    } else {
      popup.value.remove()
    }
  },
  {
    immediate: true
  }
)

watch(
  () => popup.value._content,
  next => {
    dom.value = next
  },
  { immediate: true }
)
</script>
