import * as React from "react";

function SvgPhone(props) {
  return (
    <svg width={40} height={40} {...props}>
      <path d="M32.0501 25.4328L27.8167 24.9494C26.8001 24.8328 25.8001 25.1828 25.0834 25.8994L22.0167 28.9661C17.3001 26.5661 13.4334 22.7161 11.0334 17.9828L14.1167 14.8994C14.8334 14.1828 15.1834 13.1828 15.0667 12.1661L14.5834 7.96611C14.3834 6.28278 12.9667 5.01611 11.2667 5.01611H8.3834C6.50007 5.01611 4.9334 6.58278 5.05007 8.46611C5.9334 22.6994 17.3167 34.0661 31.5334 34.9494C33.4167 35.0661 34.9834 33.4994 34.9834 31.6161V28.7328C35.0001 27.0494 33.7334 25.6328 32.0501 25.4328Z" />
    </svg>
  );
}

export default SvgPhone;