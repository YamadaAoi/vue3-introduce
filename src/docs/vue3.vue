<template>
  <div></div>
  <div></div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'

export default {
  name: 'VueThree',
  props: {},
  setup(props) {
    const state = reactive({})

    onMounted(() => {
      // mounted
    })

    watch(
      () => props,
      (newProps, preProps) => {
        console.log(newProps, preProps)
      },
      {
        deep: true,
        immediate: true
      }
    )

    const getList = () => {
      // methods
    }

    return {
      state,
      getList
    }
  }
}
</script>

<style lang="scss" scoped></style>
