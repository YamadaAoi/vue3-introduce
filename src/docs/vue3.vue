<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-21 00:29:46
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-26 22:54:01
 * @Description: 
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <div></div>
  <div></div>
</template>

<script>
import { onMounted, reactive, watch, ref, toRefs, computed } from 'vue'

export default {
  name: 'VueThree',
  props: {
    user: {
      type: String,
      default: 'admin'
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
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
    }

    return {
      state,
      changeStatus
    }
  },
  methods: {
    toggleStatus() {
      this.changeStatus()
    }
  }
}
</script>

<style lang="scss" scoped></style>
