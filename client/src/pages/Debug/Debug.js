import React from 'react';

export default function Debug() {
  // Получение cookie
  function getCookies() {
    return document.cookie
      .split('; ')
      .filter(Boolean)
      .reduce((acc, cur) => {
        const [key, ...val] = cur.split('=');
        acc[key] = decodeURIComponent(val.join('='));
        return acc;
      }, {});
  }

  // Получение информации о памяти, если поддерживается
  const memoryInfo = window.performance && window.performance.memory
    ? {
      jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
      totalJSHeapSize: window.performance.memory.totalJSHeapSize,
      usedJSHeapSize: window.performance.memory.usedJSHeapSize,
    }
    : 'Not supported';

  // Получение размеров окна
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Получение информации о сети, если поддерживается
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const networkInfo = connection
    ? {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    }
    : 'Not supported';

  // Получение информации о времени загрузки страницы
  const timing = window.performance && window.performance.timing
    ? {
      navigationStart: window.performance.timing.navigationStart,
      domContentLoadedEventEnd: window.performance.timing.domContentLoadedEventEnd,
      loadEventEnd: window.performance.timing.loadEventEnd,
    }
    : 'Not supported';

  return (
    <div style={{ padding: 24 }}>
      <h2>Debug Info</h2>
      <pre>
        {JSON.stringify({
          REACT_APP_API_URL: process.env.REACT_APP_API_URL,
          NODE_ENV: process.env.NODE_ENV,
          windowLocation: window.location.href,
          userAgent: navigator.userAgent,
          localStorage: { ...localStorage },
          cookies: getCookies(),
          windowSize,
          memoryInfo,
          networkInfo,
          timing,
          language: navigator.language,
          platform: navigator.platform,
          online: navigator.onLine,
          time: new Date().toString(),
        }, null, 2)}
      </pre>
    </div>
  );
}