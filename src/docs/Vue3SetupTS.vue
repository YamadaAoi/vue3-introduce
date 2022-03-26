<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 00:06:08
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 00:09:31
 * @Description: 
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <div></div>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, ref, toRefs, computed } from 'vue'
interface Info {
  id: string
}

// emit
const emit = defineEmits<{ (e: 'change'): void }>()

const props = defineProps<{
  user: string
}>()
// props
const { user } = toRefs(props)
// data
const status = ref(false)
const state = reactive<Info>({ id: '' })
// compute
const userStatus = computed(
  () => `${user.value}-${status.value ? '在线' : '离线'}`
)
// lifecycle
onMounted(() => {
  console.log(userStatus.value)
  state.id = '001'
  changeStatus()
})
// watch
watch(
  () => state,
  (newProps, preProps) => {
    console.log(newProps, preProps)
  },
  {
    deep: true
  }
)
// methods
function changeStatus() {
  status.value = !status.value
  emit('change')
}
</script>

<style lang="scss" scoped></style>
