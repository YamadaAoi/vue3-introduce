<template>
  <div class="map-menu">
    <div class="menu-items">
      <div
        v-for="(menu, idx) in menus"
        :key="idx"
        class="menu-item"
        :class="{ 'item-chosen': menu.chosen }"
        @click="menuChange(menu.value)"
      >
        <img
          class="menu-icon"
          :src="menu.chosen ? menu.icon2 : menu.icon1"
          :alt="menu.label"
        />
        <div class="menu-label" :class="{ 'label-chosen': menu.chosen }">
          {{ menu.label }}
        </div>
      </div>
    </div>
    <div class="manu-body">
      <div class="menu-title">
        <img
          class="menu-title-icon"
          :src="cueMenu?.icon3"
          :alt="cueMenu?.label"
        />
        <div class="menu-title-label">{{ cueMenu?.label }}</div>
      </div>
      <div class="menu-content">
        <keep-alive><component :is="cueMenu?.component" /></keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { getMapMenus } from './map_menu_svc'

const menus = reactive(getMapMenus())
const cueMenu = computed(() => {
  return menus.find(m => m.chosen)
})

function menuChange(value: string) {
  menus.forEach(m => {
    if (m.value === value) {
      m.chosen = true
    } else {
      m.chosen = false
    }
  })
}
</script>

<style scoped lang="scss">
.map-menu {
  width: 388px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .menu-items {
    width: 68px;
    height: 100%;
    background: #001314;
    .menu-item {
      width: 100%;
      height: 116px;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .menu-icon {
        width: 26px;
        height: 26px;
        display: block;
        margin-bottom: 8px;
      }
      .menu-label {
        width: 38px;
        text-align: center;
        line-height: 18px;
        word-break: break-all;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #d8e8ff;
      }
      .label-chosen {
        color: #5dcff1;
      }
    }
    .item-chosen {
      &::after {
        content: '';
        width: 68px;
        height: 22px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-image: url('../../../assets/home/menubg.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .manu-body {
    width: 320px;
    height: 100%;
    padding: 15px 0;
    background: linear-gradient(
      90deg,
      rgba(0, 30, 32, 0.9) 0%,
      rgba(0, 19, 20, 0.9) 100%
    );
    box-shadow: -2px 0px 4px 0px rgba(11, 58, 61, 0.8);
    .menu-title {
      width: 303px;
      height: 42px;
      padding-left: 22px;
      background-image: url('../../../assets/home/menu_title_bg.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .menu-title-icon {
        width: 26px;
        height: 26px;
        display: block;
        margin-right: 7px;
      }
      .menu-title-label {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        text-shadow: 0px 2px 8px #001526;
      }
    }
    .menu-content {
      width: 100%;
      height: calc(100% - 42px);
    }
  }
}
</style>
