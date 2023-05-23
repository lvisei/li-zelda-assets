import { Marker, Popup } from '@antv/larkmap';
import { useScene } from '@antv/li-sdk';
import { Swiper } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import SvgComponent from '../SvgComponent';
import type { MarkLocation } from '../types';
import styles from './index.less';

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
        <p>{location.description}</p>

        {media.length > 0 && getMediaContent()}
      </>
    );
  };

  return (
    <>
      {locations.map((location) => {
        return (
          <Marker
            key={`${location.latitude} ${location.longitude}`}
            anchor="center"
            lngLat={{ lng: location.longitude, lat: location.latitude }}
            onClick={() => onClickMark(location)}
          >
            <SvgComponent
              className={styles.makerIcon}
              icon={location.icon}
              style={{ color: location.color }}
            />
          </Marker>
        );
      })}

      {activedMark !== undefined && (
        <Popup
          className={styles.popup}
          anchor="bottom"
          offsets={[0, 20]}
          lngLat={{ lng: activedMark.longitude, lat: activedMark.latitude }}
          title={activedMark.title}
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
