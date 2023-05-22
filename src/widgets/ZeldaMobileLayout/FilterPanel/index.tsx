import type { LocalDataset } from '@antv/li-sdk';
import { useDataset } from '@antv/li-sdk';
import type { FloatingPanelRef, SelectorOption } from 'antd-mobile';
import { Button, FloatingPanel, Grid, List, SearchBar, Selector, Space } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';
import React, { useMemo, useRef, useState } from 'react';
import SvgComponent from '../SvgComponent';
import type { MarkLocation } from '../types';
import styles from './index.less';

const anchors = [72, 72 + 119, window.innerHeight * 0.8];

type FilterPanelProps = {
  datasetId: string;
  onFilterChange: (locations: MarkLocation[]) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const { datasetId, onFilterChange } = props;
  const ref = useRef<FloatingPanelRef>(null);
  const [dataset] = useDataset<LocalDataset>(datasetId);
  const data = dataset?.data;

  const [selectedCategorys, setSelectedCategorys] = useState(
    new Map<string, Record<string, any>[]>(),
  );

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

    _groupMap.forEach((categoryMap) => {
      categoryMap.forEach((categoryList, key) => {
        if (categoryList.length === 0) {
          categoryMap.delete(key);
        }
      });
    });

    return _groupMap;
  }, [data]);

  const onChangeSelectedCategorys = (
    arr: string[],
    extend: {
      items: (SelectorOption<string> & { locations: MarkLocation[] })[];
    },
  ) => {
    console.log(arr, extend.items);
    const locationList = extend.items.map((item) => item.locations).flat();
    onFilterChange(locationList);
  };

  const onClickReast = () => {
    ref.current?.setHeight(anchors[0]);
    onFilterChange([]);
  };

  const onClickView = () => {
    ref.current?.setHeight(anchors[0]);
  };

  return (
    <FloatingPanel anchors={anchors} ref={ref}>
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
                locations: categoryMap.get(category),
              }))}
              // @ts-ignore
              onChange={onChangeSelectedCategorys}
            />
          </List>
        );
      })}

      <Grid columns={3} gap={8} style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
        <Grid.Item span={1}>
          <Button size="small" block shape="default" onClick={onClickReast}>
            重置
          </Button>
        </Grid.Item>
        <Grid.Item span={2}>
          <Button size="small" block shape="default" color="primary" onClick={onClickView}>
            <Space>
              <FilterOutline />
              查看点位
            </Space>
          </Button>
        </Grid.Item>
      </Grid>

      {/* placeholder */}
      <div style={{ height: 60 }} />
    </FloatingPanel>
  );
};

export default FilterPanel;
