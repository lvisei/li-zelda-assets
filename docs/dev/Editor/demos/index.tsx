import CoreAssets from '@antv/li-core-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import ZeldaAssets from '@lvisei/li-zelda-assets';
import React from 'react';
import config from '../../configs/app-config';

const assets = [CoreAssets, ZeldaAssets];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <LocationInsightEditor
      defaultApplication={config}
      assets={assets}
      onChange={handleUpdate}
      style={{ height: '100vh' }}
    />
  );
};
