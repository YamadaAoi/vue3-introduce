export type diplayMode = 'root' | 'branch' | 'leaf'

export interface Resource {
  /**
   * id命名需要按照层级规范命名，有助于检索父子关系
   * 根节点 1
   * 下一节点 1-1,1-2，...
   * 下一节点 1-1-1，1-1-2，...
   */
  id: string
  resourceName: string
  mode: diplayMode
  checked?: boolean
  open?: boolean
  children?: Resource[]
}

/**
 * 根据id递归获取树节点
 * @param id 节点id
 * @param treeNodes
 * @returns
 */
export function getNodeById(id: string, treeNodes: Resource[]) {
  let node: Resource | undefined
  function getNode(tree: Resource[]) {
    tree.forEach(t => {
      if (t.id === id) {
        node = t
      } else if (t.children?.length) {
        getNode(t.children)
      }
    })
  }
  getNode(treeNodes)
  return node
}

/**
 * 判断当前节点是否有父节点
 * @param id 节点id
 * @returns
 */
export function hasParent(id: string) {
  return `${id}`.split('-').length > 1
}

/**
 * 根据当前节点id返回父节点id，需要所有节点id按规则设置
 * 没有父节点则返回空字符串
 * @param id 节点id
 * @returns
 */
export function getParentId(id: string) {
  let parentId = ''
  if (hasParent(id)) {
    const arr = `${id}`.split('-')
    parentId = arr.slice(0, arr.length - 1).join('-')
  }
  return parentId
}

/**
 * 递归处理tree展开事件
 * @param id 节点id
 * @param treeNodes
 */
export function toggleOpenById(id: string, treeNodes: Resource[]) {
  function toggleOpen(tree: Resource[]) {
    tree?.forEach(t => {
      if (t.id === id) {
        t.open = !t.open
      } else if (t.children?.length) {
        toggleOpen(t.children)
      }
    })
  }
  toggleOpen(treeNodes)
}

export function getResourceConfig() {
  const config: Resource[] = [
    {
      id: '1',
      resourceName: '固废图斑数据',
      mode: 'root',
      // open: true,
      children: [
        {
          id: '1-1',
          resourceName: '2017年固废图斑',
          mode: 'branch',
          // open: true,
          children: [
            {
              id: '1-1-1',
              resourceName: '一期固废图斑',
              mode: 'leaf'
            },
            {
              id: '1-1-2',
              resourceName: '二期固废图斑',
              mode: 'leaf'
            }
          ]
        },
        {
          id: '1-2',
          resourceName: '2018年固废图斑',
          mode: 'branch'
        }
      ]
    },
    {
      id: '2',
      resourceName: '无人机数据',
      mode: 'root'
    },
    {
      id: '3',
      resourceName: '影像数据',
      mode: 'root'
    },
    {
      id: '4',
      resourceName: '行政区划图（区、乡镇、村）',
      mode: 'root'
    },
    {
      id: '5',
      resourceName: '网格员点位',
      mode: 'root'
    },
    {
      id: '6',
      resourceName: '巡查补报图斑',
      mode: 'root'
    },
    {
      id: '7',
      resourceName: '共享数据',
      mode: 'root'
    }
  ]
  return config
}
