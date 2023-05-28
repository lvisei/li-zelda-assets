import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 获取选择数据源下拉框的 formily 的 Schema 配置
 */
export const getLayerSelectFormSchema = (
  props: WidgetRegisterFormProps,
  name = 'layerId',
  title = '关联的图层',
  isRequired = true,
) => {
  const datasetOptions = props.layers.map((layer) => {
    return {
      label: layer.metadata.name,
      value: layer.id,
    };
  });

  return {
    [name]: {
      type: 'string',
      title: title,
      required: isRequired,
      enum: datasetOptions,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择图层',
      },
      'x-decorator-props': {
        tooltip: '请选择关联的图层',
      },
    },
  };
};

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 地下图层 */
  undergroundLayerId?: string;
  /** 陆地图层 */
  groundLayerId?: string;
  /** 天空图层 */
  skyLayerId?: string;
  /** 是否显示侧边栏面板 */
  position?: PositionName;
  /** 标注数据源 */
  datasetId: string;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getLayerSelectFormSchema(props, 'undergroundLayerId', '地下图层', true),
    ...getLayerSelectFormSchema(props, 'groundLayerId', '陆地图层', true),
    ...getLayerSelectFormSchema(props, 'skyLayerId', '天空图层', true),
    ...getDatasetSelectFormSchema(props, 'datasetId', '标注数据源'),
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
