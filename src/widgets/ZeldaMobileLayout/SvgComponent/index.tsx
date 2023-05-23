import classNames from 'classnames';
import React from 'react';

type SvgComponentProps = {
  icon: string;
  style?: React.CSSProperties;
  className?: string;
};

const SvgComponent: React.FC<SvgComponentProps> = (props) => {
  return (
    <svg
      className={classNames(props.className)}
      style={{ width: '1em', height: '1em', fill: 'currentcolor', ...props.style }}
    >
      <use xlinkHref={'#' + props.icon} />
    </svg>
  );
};

export default SvgComponent;
