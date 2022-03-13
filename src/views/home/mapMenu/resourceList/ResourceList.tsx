import './resourceList.scss'
import { defineComponent, reactive } from 'vue'
import {
  getResourceConfig,
  Resource,
  toggleOpenById
} from './resource_list_svc'

export default defineComponent({
  name: 'ResourceList',
  setup() {
    const config = reactive(getResourceConfig())

    function getPaddingLeft(id: string) {
      return (id.split('-').length - 1) * 16
    }

    function toggleNodeOpen(nodeId: string) {
      toggleOpenById(nodeId, config)
    }

    function renderTree(nodes: Resource[]) {
      return nodes?.map(node => {
        return (
          <div
            key={node.id}
            class="resource-tree"
            style={{ paddingLeft: `${getPaddingLeft(node.id)}px` }}>
            {node.mode === 'root' ? (
              <div class="tree-root">
                <div
                  class={`root-content ${
                    node.open ? 'root-content-chosen' : ''
                  }`}
                  onClick={() => {
                    toggleNodeOpen(node.id)
                  }}>
                  {node.resourceName}
                </div>
              </div>
            ) : node.mode === 'branch' ? (
              <div class="tree-branch">
                <div
                  class="branch-info"
                  onClick={() => {
                    toggleNodeOpen(node.id)
                  }}>
                  <div class="branch-label">{node.resourceName}</div>
                </div>
              </div>
            ) : (
              <div class="tree-leaf">
                <div class="leaf-header">
                  <div
                    class={`leaf-label ${
                      node.checked ? 'leaf-label-checked' : ''
                    }`}>
                    {node.resourceName}
                  </div>
                </div>
              </div>
            )}
            {node.open && node.children?.length
              ? renderTree(node.children)
              : ''}
          </div>
        )
      })
    }

    return {
      config,
      renderTree
    }
  },
  render() {
    return (
      <div class="resource-list">
        <div class="resource-body">{this.renderTree(this.config)}</div>
      </div>
    )
  }
})
