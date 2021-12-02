import React, {
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StaticMap, FlyToInterpolator } from "!react-map-gl";
import DeckGL from "!@deck.gl/react";
import { H3HexagonLayer } from "!@deck.gl/geo-layers";
import { GlobalContext } from "../../context/store";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Map
 */
const Map = forwardRef((props, ref) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [layer, setLayer] = useState(false);

  // Initial View State (Centered on USA)
  const [viewState, setViewState] = useState({
    latitude: 40.5802,
    longitude: -95.4617,
    zoom: 3,
  });

  // Handle Click on a layer
  const handleLayerClick = (info) => {
    // set chosen hex
    dispatch({
      type: "SET_HEX",
      payload: info.object.hex,
    });
  };

  // Map Box needs an access token, set it in .env
  const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_TOKEN;

  // Move map viewstate
  useImperativeHandle(ref, () => ({
    goTo(lat, long) {
      setViewState({
        longitude: long,
        latitude: lat,
        zoom: 5,
        transitionDuration: 1500,
        transitionInterpolator: new FlyToInterpolator(),
      });
    },
  }));

  useEffect(() => {
    // Get all hexagons and their latest value from API
    axios
      .get(process.env.GATSBY_DATAPLATFORM_URL_ALL)
      .then((res) => {
        const data = [];

        // We need to check the highest and the lowest here, to
        // calculate the color codes later.
        let lowest = 10000;
        let highest = 0;
        Object.keys(res.data).map((key) => {
          const arr = {
            hex: key,
            count: res.data[key][0],
          };

          if (highest < res.data[key][0]) {
            highest = res.data[key][0];
          } else if (lowest > res.data[key][0] && res.data[key][0] >= 1700) {
            lowest = res.data[key][0];
          }

          data.push(arr);
        });

        // The actual hexagons
        const lay = new H3HexagonLayer({
          id: "h3-hexagon-layer",
          data,
          pickable: true,
          wireframe: true,
          filled: true,
          opacity: 0.6,
          elevationScale: 0,
          getLineColor: (d) => [255, 255, 255],
          getLineWidth: (d) => 1,
          getHexagon: (d) => d.hex,
          getFillColor: (d) =>
            d.hex === state.chosenHex
              ? [255, 255, 255]
              : [255, (1 - (d.count - lowest) / (highest - lowest)) * 255, 0],
          getElevation: (d) => d.count,
          onClick: (info, event) => handleLayerClick(info),
          updateTriggers: {
            getFillColor: state.chosenHex,
          },
        });
        setLayer(lay);
      })
      .catch((e) => console.log(e));
  }, [state.chosenHex]);

  return (
    <>
      {typeof window !== `undefined` && layer && (
        <DeckGL
          viewState={viewState}
          onViewStateChange={(e) => setViewState(e.viewState)}
          controller={true}
          layers={layer}
          height="600px"
          getTooltip={({ object }) =>
            object && `HEX:${object.hex} \n WYNDEX: ${object.count}`
          }
        >
          <StaticMap
            mapStyle="mapbox://styles/knallbumbum/ckw14e1h000st15p45o9kuhcy"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          >
            <div className="mapboxgl-ctrl-bottom-right"></div>
          </StaticMap>
        </DeckGL>
      )}
    </>
  );
});

export default Map;
