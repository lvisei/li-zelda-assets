import type { ImplementWidgetProps } from '@antv/li-sdk';
import { MapContainer } from '@antv/li-sdk';
import type { FloatingPanelRef } from 'antd-mobile';
import { FloatingPanel } from 'antd-mobile';
import classNames from 'classnames';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import './Component.less';
import { CLS_PREFIX } from './constant';
import FilterPanel from './FilterPanel';
import type { Properties } from './registerForm';
import RegisterSvgs from './RegisterSvgs';

const anchors = [72, 72 + 119, window.innerHeight * 0.8];

export interface ZeldaMobileLayoutProps
  extends Properties,
    ImplementWidgetProps<'content' | 'controls'> {
  children?: React.ReactNode;
}

const ZeldaMobileLayout: React.FC<ZeldaMobileLayoutProps> = (props) => {
  const { slotsElements, children } = props;

  const mapContainerSlots = useMemo(
    () => ({ content: slotsElements.content, controls: slotsElements.controls }),
    [slotsElements.content, slotsElements.controls],
  );

  const ref = useRef<FloatingPanelRef>(null);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
  }, []);

  return (
    <div className={CLS_PREFIX}>
      <RegisterSvgs />
      <div className={`${CLS_PREFIX}__main`}>
        <MapContainer
          className={classNames(`${CLS_PREFIX}__map-container`)}
          slotsElements={mapContainerSlots}
        >
          {children}
        </MapContainer>
        {/* (<div className={`${CLS_PREFIX}__bottom-panel`}></div>) */}
      </div>
      <FloatingPanel anchors={anchors} ref={ref}>
        <FilterPanel />
      </FloatingPanel>
    </div>
  );
};

export default ZeldaMobileLayout;
