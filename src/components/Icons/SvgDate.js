import * as React from "react";

function SvgDate(props) {
  return (
    <svg width={22} height={22} {...props}>
        <path d="M7 1V5M15 1V5M1 9H21M5 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H5C2.79086 21 1 19.2091 1 17V7C1 4.79086 2.79086 3 5 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default SvgDate;