import type { ImplementWidgetProps } from '@antv/li-sdk';
import React from 'react';
import type { Properties } from './registerForm';

export interface TemplateComponentProps extends Properties, ImplementWidgetProps {}

const TemplateComponent: React.FC<TemplateComponentProps> = (props) => {

  return (
    <div>
      <h3>TemplateControl</h3>
    </div>
  );
};

export default TemplateComponent;
