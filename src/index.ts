import type { Asset } from '@antv/li-sdk';
import * as Widgets from './widgets';

export * from './widgets';

const TemplateAsset: Asset = {
  version: 'v0.3',
  widgets: Object.values(Widgets),
  layers: [],
};

export default TemplateAsset;
