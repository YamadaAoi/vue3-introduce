import { FeatureCollection } from '@turf/turf'

type LayerType = 'fill' | 'circle' | 'line'

interface LayerInfo {
  type: LayerType
  color: string
  geojson: FeatureCollection
  maxZoom: number
  minZoom: number
  onClick: () => void
}

function addLayer(layer: LayerInfo) {
  // TODO
}
