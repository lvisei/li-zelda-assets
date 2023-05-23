import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ZeldaMobileLayout',
    displayName: 'Zelda 移动端布局',
    description: 'Zelda 底图应用移动端布局组件',
    type: 'Layout',
    category: 'Layout',
  },
  defaultProperties: {},
  component,
  registerForm,
});
