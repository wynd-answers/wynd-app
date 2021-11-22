import React, { useContext } from "react";
import { StaticMap, NavigationControl } from '!react-map-gl';
import DeckGL from '!@deck.gl/react';
import { H3HexagonLayer } from '!@deck.gl/geo-layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GlobalContext } from "../../context/store";

const Map = () => {
    const [, dispatch] = useContext(GlobalContext);

    // Viewport settings
    const INITIAL_VIEW_STATE = {
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 12,
        pitch: 0,
        bearing: 0
    };

    // Data to be used by the LineLayer
    const data = [
        {
            hex: '881f1d48a3fffff',
            count: 96
        }
    ]

    const layer = new H3HexagonLayer({
        id: 'h3-hexagon-layer',
        data,
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        opacity: 0.4,
        elevationScale: 0,
        getHexagon: d => d.hex,
        getFillColor: d => [255, (1 - d.count / 500) * 255, 0],
        getElevation: d => d.count,
        onClick: (info, event) => handleLayerClick(info)
    });

    const handleLayerClick = (info) => {
        dispatch({
            type: "SET_HEX",
            payload: info.object
        });
    }

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia25hbGxidW1idW0iLCJhIjoiY2t3MHo2MnJ0MDB4ZzJvcGFmN2VkdnZhYiJ9.BMtd8ZtqpDhDpEX1S5tBIg';

    return (
        <>
            {typeof window !== `undefined` &&
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    layers={layer}
                    height="600px"
                    getTooltip={({ object }) => object && `${object.hex} count: ${object.count}`}
                >
                    <StaticMap mapStyle="mapbox://styles/knallbumbum/ckw14e1h000st15p45o9kuhcy" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
                        <div className='mapboxgl-ctrl-bottom-right'>
                            <NavigationControl
                                onViewportChange={viewport => this.setState({ viewport })} />
                        </div>
                    </StaticMap>
                </DeckGL>
            }
        </>
    );
};

export default Map;
