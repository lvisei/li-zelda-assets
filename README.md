# li-zelda-assets

> Zelda Assets for [L7VP](https://locationinsight.antv.antgroup.com) App

## Player

🎮 [Online Experience](https://locationinsight.antv.antgroup.com/#/app/30dd22f0-99a4-4ae2-8858-91b00e7bbe87?type=case&embed=true)

<table>
<tr>
 <td style="text-align: center;"><image src="https://github.com/lvisei/li-zelda-assets/assets/26923747/fe1939a7-626b-4a07-89be-a748ff81fc17">
 <td style="text-align: center;"><image src="https://github.com/lvisei/li-zelda-assets/assets/26923747/819ba8e7-cee2-4694-9173-7b176d6826f5">
</table>

<image width="100%" src="https://github.com/lvisei/li-zelda-assets/assets/26923747/ef632093-3ad0-4ae4-848a-09625c0248db">

## Developer

### Install

```bash
npm i @lvisei/li-zelda-assets -S
```

### Usage

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
