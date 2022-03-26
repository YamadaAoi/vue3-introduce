<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-26 23:20:34
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-26 23:34:41
 * @Description: 
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <div></div>
  <div></div>
</template>

<script setup>
import { onMounted, reactive, watch, ref, toRefs, computed } from 'vue'
// emit
const emit = defineEmits(['change'])

const props = defineProps({
  user: {
    type: String,
    default: 'admin'
  }
})
// props
const { user } = toRefs(props)
// data
const status = ref(false)
const state = reactive({ id: '' })
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
