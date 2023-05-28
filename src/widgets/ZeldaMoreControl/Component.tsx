import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { List, Popover } from 'antd-mobile';
import { MoreOutline, QuestionCircleOutline } from 'antd-mobile-icons';
import React from 'react';
import './Component.less';
import { CLS_PREFIX } from './constants';
import type { Properties } from './registerForm';
export interface ZeldaLayerControlProps extends Properties, ImplementWidgetProps {}

const ZeldaMoreControl: React.FC<ZeldaLayerControlProps> = (props) => {
  const { position } = props;

  return (
    <>
      <CustomControl position={position} className={`${CLS_PREFIX}`}>
        <Popover
          content={
            <List>
              <List.Item
                prefix={<QuestionCircleOutline />}
                onClick={() => {
                  window.open(
                    'https://www.yuque.com/forms/share/fb2be7f6-5b57-4d5b-b5e7-7f028fc21e0e',
                    '_blank',
                  );
                }}
              >
                问题反馈
              </List.Item>
            </List>
          }
          placement="left"
          mode="dark"
          trigger="click"
        >
          <MoreOutline />
        </Popover>
      </CustomControl>
    </>
  );
};

export default ZeldaMoreControl;
