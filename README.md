# li-zelda-assets

> Zelda Assets for Location Insight App

## Install

```bash
npm i @lvisei/li-zelda-assets -S
```

## Usage

```jsx | pure
import React from 'react';
import Assets from '@lvisei/li-zelda-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import defaultApplication from './application';

const assets = [Assets];

export default () => {
  return (
    <LocationInsightEditor
      style={{ height: '100vh' }}
      defaultApplication={defaultApplication}
      assets={assets}
      onChange={(app) => {}}
    />
  );
};
```
