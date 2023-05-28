import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ZeldaMoreControl',
    displayName: '更多控件',
    description: '更多控件',
    type: 'Auto',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});
