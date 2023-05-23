import CoreAssets from '@antv/li-core-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import ZeldaAssets from '@lvisei/li-zelda-assets';
import React from 'react';
import config from '../../configs/app-config';

const assets = [CoreAssets, ZeldaAssets];

export default () => {
  return <LocationInsightApp style={{ height: '100vh' }} config={config} assets={assets} />;
};
