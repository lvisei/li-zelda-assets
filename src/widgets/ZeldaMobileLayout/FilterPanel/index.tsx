import type { LocalDataset } from '@antv/li-sdk';
import { useDataset } from '@antv/li-sdk';
import { Grid, List, SearchBar, Space } from 'antd-mobile';
import { uniqBy } from 'lodash-es';
import React from 'react';
import SvgComponent from '../SvgComponent';
import styles from './index.less';

const FilterPanel = () => {
  const [dataset] = useDataset<LocalDataset>('zelda-makers_3b8eac94-4114-4a24-83c5-8a2a21ab79d8');
  const data = dataset?.data;
  const categoryLsit = uniqBy(data, 'category');

  return (
    <>
      <Space block className={styles.search}>
        <SearchBar
          placeholder="Search for a place or address"
          showCancelButton
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </Space>

      <List header="地点" style={{ '--border-bottom': 'none' }}>
        <Grid columns={3} gap={8}>
          {categoryLsit.map((item) => (
            <Grid.Item key={item.category} className={styles.item}>
              <SvgComponent className={styles.makerIcon} icon={item.icon} />
              {item.category}
            </Grid.Item>
          ))}
        </Grid>
      </List>
    </>
  );
};

export default FilterPanel;
