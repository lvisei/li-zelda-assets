import type { LocalDataset } from '@antv/li-sdk';
import { useDataset } from '@antv/li-sdk';
import { List, SearchBar, Selector, Space } from 'antd-mobile';
import React, { useMemo } from 'react';
import SvgComponent from '../SvgComponent';
import styles from './index.less';

type FilterPanelProps = {
  datasetId: string;
};

const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const { datasetId } = props;
  const [dataset] = useDataset<LocalDataset>(datasetId);
  const data = dataset?.data;

  const groupMap = useMemo(() => {
    const _groupMap = new Map<string, Map<string, Record<string, any>[]>>();
    if (!data) return _groupMap;

    const _data = data.sort((a, b) => a.groupOrder - b.groupOrder);
    for (const item of _data) {
      if (!_groupMap.has(item.group)) {
        _groupMap.set(item.group, new Map());
      } else {
        const categoryMap = _groupMap.get(item.group)!;
        if (!categoryMap.has(item.category)) {
          categoryMap.set(item.category, []);
        } else {
          const categoryList = categoryMap.get(item.category)!;
          categoryList.push(item);
        }
      }
    }
    return _groupMap;
  }, [data]);

  return (
    <>
      <Space block className={styles.search}>
        <SearchBar
          placeholder="克拉卡塔神庙"
          showCancelButton
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </Space>
      {[...groupMap.keys()].map((groupName) => {
        const categoryMap = groupMap.get(groupName)!;
        return (
          <List
            key={groupName}
            header={groupName}
            style={{ '--border-bottom': 'none', '--border-top': 'none' }}
          >
            <Selector
              style={{
                padding: '0 12px',
                '--checked-color': 'var(--adm-color-box)',
                '--padding': '8px 8px',
              }}
              defaultValue={[]}
              columns={3}
              multiple={true}
              options={[...groupMap.get(groupName)!.keys()].map((category) => ({
                label: (
                  <SvgComponent
                    className={styles.makerIcon}
                    icon={categoryMap.get(category)![0]?.icon}
                  />
                ),
                description: `${category}(${categoryMap.get(category)?.length})`,
                value: category,
              }))}
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </List>
        );
      })}
    </>
  );
};

export default FilterPanel;
