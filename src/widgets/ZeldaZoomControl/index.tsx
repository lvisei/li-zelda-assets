import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ZeldaZoomControl',
    displayName: 'Zelda 缩放器',
    description: 'Zelda 地图层级缩放器',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topleft',
  },
  component,
  registerForm,
});
