import { useEffect, useRef } from 'react';
import {
  Viewer,
  createWorldTerrainAsync,
  Ion,
  Color,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
  Cartesian3,
  GeoJsonDataSource,
  VerticalOrigin,
  Cartesian2,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Access the environment variable
const cesiumIonAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_ACCESS_TOKEN;

if (!cesiumIonAccessToken) {
  throw new Error('Cesium Ion access token is missing. Please add it to your environment variables.');
}

Ion.defaultAccessToken = cesiumIonAccessToken;

const CesiumMap: React.FC = () => {
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    (window as any).CESIUM_BASE_URL = '/static/Cesium/';

    const initializeViewer = async () => {
      const terrainProvider = await createWorldTerrainAsync();

      if (!viewerRef.current) {
        const viewer = new Viewer('cesiumContainer', {
          terrainProvider,
          baseLayerPicker: true,
          timeline: true,
          animation: true,
        });
        viewerRef.current = viewer;
        (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';

        // Add a sample point at the Eiffel Tower
        viewer.entities.add({
          name: 'Eiffel Tower',
          position: Cartesian3.fromDegrees(2.2945, 48.8584), // Eiffel Tower coordinates
          point: {
            pixelSize: 10,
            color: Color.RED,
          },
          label: {
            text: 'Eiffel Tower',
            font: '14pt sans-serif',
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          },
          description: '<p>The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.</p>',
        });

        // Add a label for Manhattan
        viewer.entities.add({
          name: 'Manhattan',
          position: Cartesian3.fromDegrees(-73.9712, 40.7831), // Approximate center of Manhattan
          label: {
            text: 'Manhattan',
            font: '14pt sans-serif',
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          },
        });

        // Load GeoJSON data
        const geoJsonDataSource = await GeoJsonDataSource.load('/data/neighborhoods.json');
        viewer.dataSources.add(geoJsonDataSource);

        // Set up hover handler to display feature info
        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement: any) => {
          const pickedFeature = viewer.scene.pick(movement.endPosition);
          if (pickedFeature && pickedFeature.id) {
            viewer.selectedEntity = pickedFeature.id;
          } else {
            viewer.selectedEntity = undefined;
          }
        }, ScreenSpaceEventType.MOUSE_MOVE);
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

  return <div id="cesiumContainer" style={{ flexGrow: 1, height: '100vh' }} />;
};

export default CesiumMap;
