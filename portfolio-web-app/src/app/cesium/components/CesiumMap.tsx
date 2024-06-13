import { useEffect, useRef } from 'react';
import { Viewer, createWorldTerrainAsync, Ion } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const cesiumIonAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_ACCESS_TOKEN;

if (!cesiumIonAccessToken) {
  throw new Error('Cesium Ion access token is missing. Please add it to the .env.local file.');
}

Ion.defaultAccessToken = cesiumIonAccessToken;

const CesiumMap: React.FC = () => {
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    // Set the base URL for Cesium assets
    (window as any).CESIUM_BASE_URL = '/static/Cesium/';

    const initializeViewer = async () => {
      const terrainProvider = await createWorldTerrainAsync();

      if (!viewerRef.current) {
        viewerRef.current = new Viewer('cesiumContainer', {
          terrainProvider,
          baseLayerPicker: false,
        });
        (viewerRef.current.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';
      }
    };

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  return <div id="cesiumContainer" style={{ width: '100%', height: '90vh' }} />;
};

export default CesiumMap;
