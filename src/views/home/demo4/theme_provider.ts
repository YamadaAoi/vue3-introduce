/*
 * @Author: zhouyinkui
 * @Date: 2022-03-27 17:37:53
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2022-03-27 17:50:21
 * @Description: 主题配置
 * Copyright (c) 2022 by piesat, All Rights Reserved.
 */
export interface CustomTheme {
  color?: string
  fontSize?: number
}

export const defaultTheme: CustomTheme = {
  color: 'blue',
  fontSize: 16
}
