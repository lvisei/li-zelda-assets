import type { Application } from '@antv/li-sdk';
import zeldaMakers from './data.json';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: 'Zelda: Tears of the Kingdom - Power by  AntV L7VP',
    creatTime: '2023-05-05 14:38:33',
    description: '通过 LocationInsight 搭建研发的《塞尔达：王国之泪》移动端地图应用',
  },
  datasets: [
    {
      id: '20f29561-8381-4209-9ccf-04999d01db35',
      type: 'raster-tile',
      metadata: { name: 'Groundtiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        url: 'https://cdn.jsdelivr.net/gh/Slluxx/TOTK-Interactive-Map@tiles/assets/tiles/groundtiles/{z}/{x}/{y}.png',
        parser: {
          type: 'rasterTile',
          tileSize: 256,
          minZoom: 0,
          maxZoom: 8,
          // extent: [-180, 85.051355, 17.75066182074289, 15.04206005516698],
        },
      },
    },
    {
      id: '734eb079-260c-4b3f-bf48-e28e92f88368',
      type: 'raster-tile',
      metadata: { name: 'Skytiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        url: 'https://cdn.jsdelivr.net/gh/Slluxx/TOTK-Interactive-Map@tiles/assets/tiles/skytiles/{z}/{x}/{y}.png',
        parser: {
          type: 'rasterTile',
          tileSize: 256,
          minZoom: 0,
          maxZoom: 8,
          // extent: [-180, 85.051355, 17.75066182074289, 15.04206005516698],
        },
      },
    },
    {
      id: 'f803ba2c-f41a-48d8-bb14-6f9d40e23cda',
      type: 'raster-tile',
      metadata: { name: 'Undergroundtiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        url: 'https://cdn.jsdelivr.net/gh/Slluxx/TOTK-Interactive-Map@tiles/assets/tiles/undergroundtiles/{z}/{x}/{y}.png',
        parser: {
          type: 'rasterTile',
          tileSize: 256,
          minZoom: 0,
          maxZoom: 8,
          // extent: [-180, 85.051355, 17.75066182074289, 15.04206005516698],
        },
      },
    },
    {
      id: 'zelda-makers_3b8eac94-4114-4a24-83c5-8a2a21ab79d8',
      metadata: {
        name: 'zelda-makers',
      },
      data: zeldaMakers,
      columns: [],
      type: 'local',
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      // basemap: 'Map',
      config: {
        zoom: 0,
        minZoom: 0,
        maxZoom: 8,
        center: [120.153576, 30.287459],
        pitch: 0,
        bearing: 0,
        style: 'dark',
        WebGLParams: { preserveDrawingBuffer: true },
      },
    },
    layers: [
      // {
      //   id: 'b0c70759-7706-49c6-b98e-635624e8c6f4',
      //   type: 'TileLayer',
      //   metadata: { name: 'Undergroundtiles' },
      //   sourceConfig: {
      //     parser: { type: 'rasterTile' },
      //     datasetId: 'f803ba2c-f41a-48d8-bb14-6f9d40e23cda',
      //   },
      //   visConfig: {
      //     style: { opacity: 1 },
      //     minZoom: 0,
      //     maxZoom: 8,
      //     blend: 'normal',
      //     visible: false,
      //   },
      // },
      {
        id: 'ab8af73f-fd47-4607-9eb2-686bef746e06',
        type: 'TileLayer',
        metadata: { name: 'Groundtiles' },
        sourceConfig: {
          parser: { type: 'rasterTile' },
          datasetId: '20f29561-8381-4209-9ccf-04999d01db35',
        },
        visConfig: {
          style: { opacity: 1 },
          minZoom: 0,
          maxZoom: 8,
          blend: 'normal',
          visible: true,
        },
      },
      // {
      //   id: '7f4c248c-33cd-4133-842e-e256344d590c',
      //   type: 'TileLayer',
      //   metadata: { name: 'Skytiles' },
      //   sourceConfig: {
      //     parser: { type: 'rasterTile' },
      //     datasetId: '734eb079-260c-4b3f-bf48-e28e92f88368',
      //   },
      //   visConfig: {
      //     style: { opacity: 1 },
      //     minZoom: 0,
      //     maxZoom: 8,
      //     blend: 'normal',
      //     visible: false,
      //   },
      // },
    ],
    widgets: [
      {
        id: '0ce6afbd-cd82-4879-9639-f2c978fdd920',
        type: 'ZeldaMobileLayout',
        metadata: {
          name: 'ZeldaMobileLayout',
        },
        properties: {},
      },
      {
        id: 'ZoomControl1',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: { position: 'topright', showZoom: true },
        container: { id: 'ZeldaMobileLayout', slot: 'controls' },
      },
      {
        id: 'FullscreenControl1',
        type: 'FullscreenControl',
        metadata: { name: '地图全屏' },
        properties: { position: 'topright' },
        container: { id: 'ZeldaMobileLayout', slot: 'controls' },
      },
      {
        id: 'MapViewSettingControl1',
        type: 'MapViewSettingControl',
        metadata: { name: '地图倾角' },
        properties: { position: 'topright' },
        container: { id: 'ZeldaMobileLayout', slot: 'controls' },
      },
      {
        id: 'MouseLocationControl4',
        type: 'MouseLocationControl',
        metadata: { name: '光标经纬度' },
        properties: { position: 'bottomleft' },
        container: { id: 'ZeldaMobileLayout', slot: 'controls' },
      },
      {
        id: 'ExportImageControl_ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
        type: 'ExportImageControl',
        metadata: { name: '导出图片' },
        properties: { position: 'topright' },
        container: { id: 'ZeldaMobileLayout', slot: 'controls' },
      },
    ],
  },
};

export default config;
