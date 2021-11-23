import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import { GlobalContext } from '../../context/store';

const Chart = ({ hex }) => {
    const [state, dispatch] = useContext(GlobalContext);
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: '#1F3954'
                },
                ticks: {
                    display: false //this will remove only the label
                }
            },
            y: {
                grid: {
                    color: '#1F3954'
                },
                ticks: {
                    display: false //this will remove only the label
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Historical Data',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'WYNDEX',
                data: values,
                borderColor: "white"
            }
        ],
    };

    useEffect(() => {
        const l = [];
        const v = [];

        axios.get(process.env.GATSBY_DATAPLATFORM_URL + hex)
            .then(res => {
                Object.keys(res.data.data["HCHO"]).map(el => {
                    const date = new Date(el);
                    l.push(date.toLocaleDateString('en-US'));
                    v.push(res.data.data["HCHO"][el]);
                });
                setLabels(l);
                setValues(v);
            });
    }, [state.chosenHex]);

    return (
        <Line
            datasetIdKey='id'
            data={{
                labels: labels,
                datasets: [
                    {
                        id: 1,
                        label: '',
                        data: values,
                        borderColor: 'white'
                    }
                ]
            }}
            options={options}
        />
    )
}

export default Chart;