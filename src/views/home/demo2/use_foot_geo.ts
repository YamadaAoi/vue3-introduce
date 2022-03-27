/*
 * @Author: zhouyinkui
 * @Date: 2022-03-27 16:44:06
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:25:23
 * @Description: 获取游览地信息
 * Copyright (c) 2022 by piesat, All Rights Reserved.
 */
import { Feature } from '@turf/turf'
import { watch, Ref, onMounted } from 'vue'
import { getDataById } from '../demo1/user_info_api'

export default function useFootGeo(
  foot: Ref<string | undefined>,
  setData: (geo: Feature) => void
) {
  onMounted(() => {
    getGeo().catch(err => console.error(err))
  })

  watch(foot, getGeo, { immediate: true })

  async function getGeo() {
    if (foot.value) {
      const resp = await getDataById(foot.value)
      if (resp?.data?.type === 'Feature') {
        setData(resp.data as Feature)
      }
    }
  }
}
