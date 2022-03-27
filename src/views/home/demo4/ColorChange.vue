<!--
 * @Author: zhouyinkui
 * @Date: 2022-03-27 17:57:41
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 18:07:52
 * @Description: 测试改变颜色
 * Copyright (c) 2022 by piesat, All Rights Reserved. 
-->
<template>
  <div class="color-change" @click="changeColor?.('red')">变色</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const changeColor: ((color: string) => void | undefined) | undefined =
  inject('changeThemeColor')
</script>

<style scoped lang="scss">
.color-change {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  position: absolute;
  top: 38px;
  right: 16px;
  z-index: 9;
}
</style>
