import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 是否显示侧边栏面板 */
  position?: PositionName;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        options: [
          {
            value: 'topleft',
            label: '左上',
          },
          {
            value: 'topright',
            label: '右上',
          },
          {
            value: 'bottomleft',
            label: '左下',
          },
          {
            value: 'bottomright',
            label: '右下',
          },
        ],
      },
      default: 'bottomright',
    },
  };
  return { schema };
};
