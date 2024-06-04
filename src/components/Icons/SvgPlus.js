import * as React from "react";

function SvgPlus(props) {
  return (
    <svg width={16} height={16} {...props}>
        <path d="M8 15V8M8 8V1M8 8H15M8 8H1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default SvgPlus;