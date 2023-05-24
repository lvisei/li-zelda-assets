import type { LocalDatasetSchema } from '@antv/li-sdk';
import { useDataset, useEventSubscribe } from '@antv/li-sdk';
import type { FloatingPanelRef, SelectorOption } from 'antd-mobile';
import { Button, FloatingPanel, Grid, List, SearchBar, Selector, Space } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getUrlParams } from '../../../utils';
import SvgComponent from '../SvgComponent';
import type { MarkLocation } from '../types';
import styles from './index.less';
import SearchBody from './SearchBody';

const anchors = [72, 68 + 119, window.innerHeight * 0.8];

type FilterPanelProps = {
  datasetId: string;
  onFilterChange: (locations: MarkLocation[]) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const { datasetId, onFilterChange } = props;
  const floatingPanelRef = useRef<FloatingPanelRef>(null);
  const [dataset] = useDataset<LocalDatasetSchema<MarkLocation>>(datasetId);

  const [layerType, setLayerType] = useState('ground');
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchValue, setSearchValue] = useState<string>();

  const [selectedGroups, setSelectedGroups] = useState(
    new Map<string, { values: string[]; locations: MarkLocation[] }>(),
  );

  const layerData = useMemo(
    () => dataset?.data?.filter((item) => item.mapType === layerType),
    [dataset?.data, layerType],
  );
  const groupMap = useMemo(() => {
    const _groupMap = new Map<string, Map<string, Record<string, any>[]>>();
    if (!layerData) return _groupMap;

    const _data = layerData
      .filter((item) => item.mapType === layerType)
      .sort((a, b) => a.groupOrder - b.groupOrder);
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
  }, [layerData, layerType]);

  const groupNames = useMemo(() => [...groupMap.keys()], [groupMap]);

  const handleSelected = (
    _selectedGroups: Map<string, { values: string[]; locations: MarkLocation[] }>,
  ) => {
    setSelectedGroups(_selectedGroups);
    const locationList = [..._selectedGroups.values()].map((item) => item.locations).flat();
    onFilterChange(locationList);
  };

  // 监听图层切换
  useEventSubscribe('zelda-layer-change', (value: 'sky' | 'ground' | 'underground') => {
    setLayerType(value);
    handleSelected(new Map());
  });

  /**
   * 组件初始化时
   */
  useEffect(() => {
    floatingPanelRef.current?.setHeight(anchors[1]);
  }, []);

  useEffect(() => {
    const { locationId } = getUrlParams(location.href);
    if (!locationId || !dataset?.data?.length) {
      return;
    }
    const targetLocation = dataset?.data?.find((location) => location.id === locationId);
    if (targetLocation) {
      onFilterChange([targetLocation]);
    }
  }, [dataset?.data]);

  const onChangeSelected = (
    groupName: string,
    values: string[],
    extend: {
      items: (SelectorOption<string> & { locations: MarkLocation[] })[];
    },
  ) => {
    const _selectedGroups = new Map(selectedGroups);
    _selectedGroups.set(groupName, {
      values,
      locations: extend.items.map((item) => item.locations).flat(),
    });
    handleSelected(_selectedGroups);
  };

  const onClickSearch = (location: MarkLocation) => {
    setSelectedGroups(new Map());
    onFilterChange([location]);
    floatingPanelRef.current?.setHeight(anchors[1]);
  };

  const onClickReset = () => {
    setSearchValue('');
    floatingPanelRef.current?.setHeight(anchors[0]);
    handleSelected(new Map());
    setShowSearchPanel(false);
  };

  const onClickView = () => {
    floatingPanelRef.current?.setHeight(anchors[0]);
  };

  const renderHeader = () => {
    return (
      <Space block className={styles.search}>
        <SearchBar
          value={searchValue}
          placeholder="克拉卡塔神庙"
          showCancelButton
          onFocus={() => {
            setShowSearchPanel(true);
            floatingPanelRef.current?.setHeight(anchors[2]);
          }}
          onCancel={() => {
            setShowSearchPanel(false);
          }}
          onBlur={() => {
            if (!searchValue) {
              setShowSearchPanel(false);
            }
          }}
          onClear={() => {
            setShowSearchPanel(false);
          }}
          onChange={setSearchValue}
        />
      </Space>
    );
  };

  const renderMarkList = () => {
    return groupNames.map((groupName) => {
      const categoryMap = groupMap.get(groupName)!;
      const options = [...categoryMap.keys()].map((category) => ({
        label: (
          <SvgComponent className={styles.markIcon} icon={categoryMap.get(category)![0]?.icon} />
        ),
        description: `${category}(${categoryMap.get(category)?.length})`,
        value: category,
        locations: categoryMap.get(category),
      }));

      return (
        <List
          className={styles.groupList}
          key={groupName}
          header={groupName}
          style={{ '--border-bottom': 'none', '--border-top': 'none' }}
        >
          <Selector
            style={{
              padding: '0 12px',
              '--checked-color': 'var(--adm-color-box)',
              '--checked-border': 'solid var(--adm-color-primary) 1px',
              '--border': 'solid transparent 1px',
              '--padding': '7px 7px',
            }}
            defaultValue={[]}
            value={selectedGroups.get(groupName)?.values || []}
            columns={3}
            multiple={true}
            options={options}
            // @ts-ignore
            onChange={(arr, extend) => onChangeSelected(groupName, arr, extend)}
          />
        </List>
      );
    });
  };

  const renderBody = () => {
    if (showSearchPanel) {
      return <SearchBody data={layerData} keyword={searchValue} onClick={onClickSearch} />;
    }

    return renderMarkList();
  };

  const renderFooter = () => (
    <>
      <Grid columns={3} gap={8} className={styles.btnGroup}>
        <Grid.Item span={1}>
          <Button size="small" block shape="default" onClick={onClickReset}>
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
    </>
  );

  return (
    <FloatingPanel anchors={anchors} ref={floatingPanelRef}>
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </FloatingPanel>
  );
};

export default FilterPanel;
