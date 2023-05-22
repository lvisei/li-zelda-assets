import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LayerControl',
    displayName: '图层控件',
    description: '图层显隐控件',
    type: 'Auto',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});
