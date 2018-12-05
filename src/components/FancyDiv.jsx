import React from 'react';

function FancyDiv(props) {
  const style = { ...props.style };
  if (props.color) style.backgroundColor = props.color;

  return (
    <div style={style} className={props.className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default FancyDiv;
