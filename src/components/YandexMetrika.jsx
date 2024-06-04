import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';

export default function YandexMetrika({ account }) {
  return (
    <div style={{ position: 'absolute' }}>
      <YMInitializer
        accounts={[account]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
      />
    </div>
  )
}
