import * as React from "react";

function SvgMinus(props) {
  return (
    <svg width={16} height={2} {...props}>
        <path d="M1 1H15" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default SvgMinus;