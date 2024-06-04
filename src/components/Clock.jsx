import React, { useEffect, useState } from 'react';

export default function Clock() {
    const [value, setValue] = useState(new Date());


    const style = {
      fontSize: 24, 
      fontWeight: 500
    }

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 60000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div style={ style }>{ value.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }</div>
    );
}