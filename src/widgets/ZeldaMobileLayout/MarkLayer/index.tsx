import { Marker, Popup } from '@antv/larkmap';
import { useScene } from '@antv/li-sdk';
import { Swiper } from 'antd-mobile';
import { LinkOutline } from 'antd-mobile-icons';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from 'react';
import { copyText } from '../../../utils';
import SvgComponent from '../SvgComponent';
import type { MarkLocation } from '../types';
import { CLS_PREFIX } from './constants';
import './index.less';

type MarkLayerProps = {
  locations: MarkLocation[];
};

const MarkLayer: React.FC<MarkLayerProps> = (props) => {
  const { locations } = props;
  const [, { setMapViewState }] = useScene();

  const [activedMark, setActivedMark] = useState<MarkLocation>();

  useEffect(() => {
    if (activedMark) {
      setActivedMark(undefined);
    }
    // 当只有一个点时，定位到该点
    if (locations.length === 1) {
      setMapViewState({ zoom: 6, center: [locations[0].longitude, locations[0].latitude] });
    }
  }, [locations]);

  const onClickMark = (mark: MarkLocation) => {
    setActivedMark(mark);
  };

  const onShare = ({ id }: MarkLocation) => {
    copyText(location.origin + location.pathname + `?locationId=${id}`, '标注链接复制成功');
  };

  const getPopupContent = (location: MarkLocation) => {
    const media = location.media.filter((item) => item.type === 'bilibili');

    const getMediaContent = () => {
      return (
        <Swiper
          defaultIndex={0}
          style={{
            '--track-padding': ' 0 0 16px',
            pointerEvents: 'auto',
          }}
        >
          {media.map((item) => (
            <Swiper.Item key={item.id}>
              <iframe
                width={168}
                height={94}
                src={item.url}
                scrolling="no"
                frameBorder="no"
                allowFullScreen={true}
              />
            </Swiper.Item>
          ))}
        </Swiper>
      );
    };

    return (
      <>
        <p>{location.category}</p>
        <p>
          <Markdown>{location.description}</Markdown>
        </p>

        {media.length > 0 && getMediaContent()}
      </>
    );
  };

  return (
    <>
      {locations.map((location) => {
        return (
          <Marker
            key={location.id}
            anchor="center"
            lngLat={{ lng: location.longitude, lat: location.latitude }}
            onClick={() => onClickMark(location)}
          >
            <SvgComponent
              className={`${CLS_PREFIX}__markIcon`}
              style={{
                color: location.color,
              }}
              icon={location.icon}
            />
          </Marker>
        );
      })}

      {activedMark !== undefined && (
        <Popup
          className={`${CLS_PREFIX}__popup`}
          anchor="bottom"
          offsets={[0, 20]}
          lngLat={{ lng: activedMark.longitude, lat: activedMark.latitude }}
          title={
            <div>
              <LinkOutline className={`${CLS_PREFIX}__linkIcon`} onClick={() => onShare(activedMark)} />
              <div style={{ overflow: 'hidden' }}>{activedMark.title}</div>
            </div>
          }
          closeOnClick={true}
          closeButton={false}
          onHide={() => setActivedMark(undefined)}
        >
          {getPopupContent(activedMark)}
        </Popup>
      )}
    </>
  );
};

export default MarkLayer;
