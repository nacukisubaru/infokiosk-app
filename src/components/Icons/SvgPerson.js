import * as React from "react";

function SvgPerson(props) {
  return (
    <svg width={19} height={19} {...props}>
        <path d="M9.5 9.5C12.1244 9.5 14.25 7.37437 14.25 4.75C14.25 2.12562 12.1244 0 9.5 0C6.87563 0 4.75 2.12562 4.75 4.75C4.75 7.37437 6.87563 9.5 9.5 9.5ZM9.5 2.375C10.8062 2.375 11.875 3.44375 11.875 4.75C11.875 6.05625 10.8062 7.125 9.5 7.125C8.19375 7.125 7.125 6.05625 7.125 4.75C7.125 3.44375 8.19375 2.375 9.5 2.375Z"/>
        <path d="M9.5 10.6875C6.32937 10.6875 0 12.2787 0 15.4375V19H19V15.4375C19 12.2787 12.6706 10.6875 9.5 10.6875ZM16.625 16.625H2.375V15.4494C2.6125 14.5944 6.29375 13.0625 9.5 13.0625C12.7063 13.0625 16.3875 14.5944 16.625 15.4375V16.625Z"/>
    </svg>
  );
}

export default SvgPerson;