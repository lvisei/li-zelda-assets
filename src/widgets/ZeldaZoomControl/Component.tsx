import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import classNames from 'classnames';
import { round } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import styles from './Component.less';
import type { Properties } from './registerForm';

export interface ZeldaZoomControlProps extends ImplementWidgetProps, Properties {}

const ZeldaZoomControl: React.FC<ZeldaZoomControlProps> = (props) => {
  const { position } = props;

  const [scene] = useScene();
  const [zoom, setZoom] = useState(() => round(scene?.getZoom() ?? 3));

  const onZoomIn = () => {
    scene?.zoomIn();
  };

  const onZoomOut = () => {
    scene?.zoomOut();
  };

  useEffect(() => {
    if (scene) {
      const onZoomChange = () => {
        const zoomend = round(scene.getZoom());
        setZoom(zoomend);
      };

      scene.on('zoomend', onZoomChange);
      return () => {
        scene.off('zoomend', onZoomChange);
      };
    }
  }, [scene]);

  return (
    <CustomControl position={position} className={styles.zoomControl}>
      <div
        className={classNames(styles.zoomItem, styles.zoomBtn, styles.zoomBtnIn)}
        onClick={onZoomIn}
      >
        <PlusOutlined />
      </div>
      <div className={classNames(styles.zoomItem, styles.zoomNumber)}>{zoom}</div>
      <div
        className={classNames(styles.zoomItem, styles.zoomBtn, styles.zoomBtnOut)}
        onClick={onZoomOut}
      >
        <MinusOutlined />
      </div>
    </CustomControl>
  );
};

export default ZeldaZoomControl;
