/*
 * @Author: zhouyinkui
 * @Date: 2022-03-27 16:33:00
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:01:58
 * @Description: 获取用户足迹
 * Copyright (c) 2022 by piesat, All Rights Reserved.
 */
import { ref, watch, Ref, onMounted } from 'vue'
import { getDataById } from '../demo1/user_info_api'

export default function useUserFoots(user: Ref<string>) {
  const foots = ref<string[]>([])

  onMounted(() => {
    getFoot().catch(err => console.error(err))
  })

  watch(user, getFoot, { immediate: true })

  async function getFoot() {
    const resp = await getDataById(user.value)
    foots.value = resp.data?.foots ?? []
  }

  return { foots }
}
