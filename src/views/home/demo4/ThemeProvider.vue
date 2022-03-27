<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 17:36:08
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:55:38
 * @Description: 主题配置
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide, readonly, ref, watch } from 'vue'
import { CustomTheme, defaultTheme } from './theme_provider'

const props = defineProps<{ theme?: CustomTheme }>()
const theme = ref<CustomTheme>()

watch(
  () => props.theme,
  () => {
    theme.value = getTheme()
  },
  { immediate: true }
)

provide('theme-provide', readonly(theme))
provide('changeThemeColor', changeThemeColor)

function changeThemeColor(color: string) {
  theme.value = { ...theme.value, color }
}

function getTheme() {
  if (props.theme) {
    return { ...defaultTheme, ...props.theme }
  } else {
    return { ...defaultTheme }
  }
}
</script>
