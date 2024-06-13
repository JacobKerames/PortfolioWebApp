'use client';

import dynamic from 'next/dynamic';

const CesiumMap = dynamic(() => import('./components/CesiumMap'), { ssr: false });

const Cesium: React.FC = () => {
  return (
    <div>
      <CesiumMap />
    </div>
  );
};

export default Cesium;
