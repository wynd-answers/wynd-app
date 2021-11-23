import React, { useContext, useEffect, useState } from "react";
import { StaticMap, NavigationControl } from '!react-map-gl';
import DeckGL from '!@deck.gl/react';
import { H3HexagonLayer } from '!@deck.gl/geo-layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GlobalContext } from "../../context/store";
import axios from "axios";

const Map = () => {
    const [, dispatch] = useContext(GlobalContext);
    const [layer, setLayer] = useState(false);

    // Viewport settings
    const INITIAL_VIEW_STATE = {
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 12,
        pitch: 0,
        bearing: 0
    };


    const handleLayerClick = (info) => {
        dispatch({
            type: "SET_HEX",
            payload: info.object
        });
    }

    const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_TOKEN;

    useEffect(() => {
        axios.get(process.env.GATSBY_DATAPLATFORM_URL_ALL)
            .then(res => {
                const data = [];
                let lowest = 10000;
                let highest = 0;
                Object.keys(res.data).map((key) => {

                    const arr = {
                        "hex": key,
                        "count": res.data[key][0]
                    }

                    if (highest < res.data[key][0]) {
                        highest = res.data[key][0];
                    } else if (lowest > res.data[key][0]) {
                        lowest = res.data[key][0];
                    }
                    
                    data.push(arr);
                });

                console.log(highest - lowest);

                const lay = new H3HexagonLayer({
                    id: 'h3-hexagon-layer',
                    data,
                    pickable: true,
                    wireframe: false,
                    filled: true,
                    extruded: true,
                    opacity: 0.6,
                    elevationScale: 0,
                    getHexagon: d => d.hex,
                    getFillColor: d => [255, (1 - (d.count - lowest) / (highest - lowest)) * 255, 0],
                    getElevation: d => d.count,
                    onClick: (info, event) => handleLayerClick(info)
                });
                setLayer(lay);
            })
            .catch(e => console.log(e))
    }, []);

    return (
        <>
            {(typeof window !== `undefined` && layer) &&
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    layers={layer}
                    height="600px"
                    getTooltip={({ object }) => object && `HEX:${object.hex} \n WYNDEX: ${object.count}`}
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
