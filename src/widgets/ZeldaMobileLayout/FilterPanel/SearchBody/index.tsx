import { stringSearch } from '@antv/li-sdk/dist/esm/utils/filters/string-search';
import { List, Result } from 'antd-mobile';
import { SearchOutline, SmileOutline } from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';
import SvgComponent from '../../SvgComponent';
import type { MarkLocation } from '../../types';

type SearchBodyProps = {
  keyword?: string;
  data?: MarkLocation[];
  onClick?: (locations: MarkLocation) => void;
};

const SearchBody: React.FC<SearchBodyProps> = (props) => {
  const { keyword, data = [], onClick } = props;

  const [locations, setLocations] = useState<MarkLocation[]>([]);

  useEffect(() => {
    if (!keyword) return setLocations([]);

    const filterData = data.filter((item) => {
      return stringSearch([keyword], item.title) || stringSearch([keyword], item.description);
    });

    setLocations(filterData);
  }, [data, keyword]);

  if (locations.length === 0) {
    if (keyword) {
      return (
        <Result
          icon={<SearchOutline />}
          status="waiting"
          title=""
          description="当前关键字暂无搜索结果，请重新输入"
        />
      );
    }
    return (
      <Result
        icon={<SmileOutline />}
        status="waiting"
        title=""
        description="请输入标记点位关键字，如：“希斯拉纳神庙”、“格鲁德峡谷”、 “记忆”～"
      />
    );
  }

  return (
    <>
      <List
        header={`${locations.length} 个结果`}
        style={{
          '--border-top': 'none',
          '--border-bottom': 'none',
          '--border-inner': 'solid 1px var(--adm-border-color)',
        }}
      >
        {locations.map((location) => (
          <List.Item
            key={location.id}
            style={{ '--active-background-color': 'var(--adm-color-box)' }}
            clickable
            prefix={
              <SvgComponent
                icon={location.icon}
                style={{ color: location.color, borderRadius: 20, width: 40, height: 40, fontSize: 30 }}
              />
            }
            extra={location.category}
            description={location.description}
            onClick={() => onClick?.(location)}
          >
            {location.title}
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default SearchBody;
