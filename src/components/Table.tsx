import React, {useEffect, useState} from "react";
import {IconPhoto} from "@tabler/icons-react";
import axios from "axios";
import {DatePicker, LocalizationProvider, TimeField} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import UploadImg from "@/components/UploadImg";

interface Props {
    listOfCity: string[]
}

export default function Table({listOfCity}: Props) {
    const [sortedBy, setSortedBy] = useState<string>("value ASC");
    const [result, setResult] = useState<any>([]);
    const [startDate, setStartDate] = useState<string>(getCurrentDate);
    const [endDate, setEndDate] = useState<string>(getCurrentDate());
    const [startTime, setStartTime] = useState<string>("08:00:00");
    const [endTime, setEndTime] = useState<string>("23:00:00");
    const [selectedOption, setSelectedOption] = useState<number>();
    const [fileNames, setFileNames] = useState<string>();


    const handleOpenModal = async (id: number) => {
        axios.defaults.baseURL = 'http://localhost/pm25';
        try {
            const response = await axios.get('/upload-img/fetch', {
                headers: {
                    "data_id": id, "token": "1234567890"
                }
            });
            setSelectedOption(id);
            if (response.data.length > 0) {
                setFileNames(response.data[0].name)
            } else {
                setFileNames("next.svg")
            }
            console.log(fileNames);
        } catch (e) {
            console.log(e)
        }
    }

    //GET DATA FROM API
    const fetchData = async (temp: string[]) => {
        axios.defaults.baseURL = 'http://localhost/pm25';
        const response = await axios.get(`/data/fetch/${temp[0]}`, {
            headers: {
                "sort_order": temp[1],
                "start_date": startDate,
                "end_date": endDate,
                "start_time": startTime,
                "end_time": endTime,
                "token": "1234567890"
            }
        });
        setResult(response.data);
    }

    useEffect(() => {
        const temp = sortedBy.split(" ");
        try {
            fetchData(temp)
        } catch (e) {
            console.log(e)
        }
    }, [sortedBy, startDate, endDate, startTime, endTime, listOfCity])


    function getCurrentDate() {
        // @ts-ignore
        const {$D: dd, $M, $y: yyyy} = dayjs(new Date());
        const mm = $M + 1;
        return `${yyyy}-${mm}-${dd}`
    }

    const handleStartDate = (e: any) => {
        const {$y: yyyy, $M, $D: dd} = e;
        const mm = $M + 1;
        const date = `${yyyy}-${mm}-${dd}`;
        setStartDate(date)
    }

    const handleEndDate = (e: any) => {
        const yyyy = e.$y;
        const mm = e.$M + 1;
        const dd = e.$D;
        const date = `${yyyy}-${mm}-${dd}`;
        setEndDate(date)
    }

    const handleStartTime = (e: any) => {
        const hh = e.$H;
        const mm = e.$m;
        const ss = e.$s;
        const time = `${hh}:${mm}:${ss}`;
        setStartTime(time)
    }

    const handleEndTime = (e: any) => {
        const hh = e.$H;
        const mm = e.$m;
        const ss = e.$s;
        const time = `${hh}:${mm}:${ss}`;
        setEndTime(time)
    }

    const colorCode = (code: number) => {
        let style;
        if (code >= 0 && code <= 50) {
            return style = {
                color: "#1D8348",
            }
        } else if (code >= 51 && code <= 100) {
            return style = {
                color: "#B7950B"
            }
        } else if (code >= 101 && code <= 200) {
            return style = {
                color: "#BA4A00"
            }
        } else if (code >= 201 && code <= 300) {
            return style = {
                color: "#922B21"
            }
        } else if (code >= 301 && code <= 400) {
            return style = {
                color: "#5B2C6F"
            }
        } else if (code >= 401 && code <= 500) {
            return style = {
                color: "#5B2C6F"
            }
        }
    }

    return (<div>
        <h3 className={"text-primary text-center mb-4 fw-light"}><u>Result of you keyword</u></h3>
        <div className={"d-flex flex-column gap-4 mb-3"}>
            <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => {
                setSortedBy(e.target.value)
            }}>
                <option defaultValue={"value ASC"} value={"value ASC"}>Sorted by PM2.5 value (ASC)</option>
                <option value={"value DESC"}>Sorted by PM2.5 value (DESC)</option>
                <option value={"aqi ASC"}>Sorted by AQI value (ASC)</option>
                <option value={"aqi DESC"}>Sorted by AQI value (DESC)</option>
            </select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={"d-flex gap-3 justify-content-center"}>
                    <div>
                        <DatePicker
                            label="Start Date"
                            className={"me-2"}
                            format={"YYYY-MM-DD"}
                            onChange={(e) => {
                                handleStartDate(e)
                            }}
                            value={dayjs(new Date())}
                        />
                        <DatePicker
                            label="End Date"
                            format={"YYYY-MM-DD"}
                            onChange={(e) => {
                                handleEndDate(e)
                            }}
                            value={dayjs(new Date())}
                        />
                    </div>
                    <div>
                        <TimeField
                            label="Start Time"
                            format={"HH:mm:ss"}
                            className={"me-2"}
                            onChange={(e) => {
                                handleStartTime(e)
                            }}
                            value={dayjs("2022-04-17T08:00:00")}
                        />
                        <TimeField
                            label="End Time"
                            format={"HH:mm:ss"}
                            onChange={(e) => {
                                handleEndTime(e)
                            }}
                            value={dayjs("2022-04-17T23:00:00")}
                        />
                    </div>
                </div>
            </LocalizationProvider>
        </div>
        <table className="table table-striped text-center">
            <thead className={"thead-dark"}>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">STATION ID</th>
                <th scope="col">STATION NAME</th>
                <th scope="col">AREA</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">AQI</th>
                <th scope="col">PM2.5 VALUE</th>
                <th scope="col">COLOR CODE</th>
                <th scope="col">OPTIONS</th>
            </tr>
            </thead>
            <tbody>
            {result.map((data: any, index: any) => {
                if (listOfCity.length === 0) {
                    return (<tr key={index}>
                        <td>{index + 1}</td>
                        <td style={colorCode(data.value)}>{data.station_id}</td>
                        <td style={colorCode(data.value)}>{data.nameTH}</td>
                        <td style={colorCode(data.value)}>{data.areaTH}</td>
                        <td style={colorCode(data.value)}>{data.date}</td>
                        <td style={colorCode(data.value)}>{data.time}</td>
                        <td style={colorCode(data.value)}>{data.aqi}</td>
                        <td style={colorCode(data.value)}>{data.value}</td>
                        <td style={colorCode(data.value)}>{data.color_id}</td>
                        <td>
                            <IconPhoto style={{
                                cursor: "pointer"
                            }}
                                       data-bs-toggle="modal" data-bs-target="#imageModal"
                                       onClick={() => {
                                           handleOpenModal(data.id);
                                       }}
                            />
                        </td>
                    </tr>)
                } else {
                    for (let i = 0; i < listOfCity.length; i++) {
                        if (data.areaTH.includes(listOfCity[i]) || data.nameTH.includes(listOfCity[i])) {
                            return (<tr key={index}>
                                <td>{data.id}</td>
                                <td style={colorCode(data.value)}>{data.station_id}</td>
                                <td style={colorCode(data.value)}>{data.nameTH}</td>
                                <td style={colorCode(data.value)}>{data.areaTH}</td>
                                <td style={colorCode(data.value)}>{data.date}</td>
                                <td style={colorCode(data.value)}>{data.time}</td>
                                <td style={colorCode(data.value)}>{data.aqi}</td>
                                <td style={colorCode(data.value)}>{data.value}</td>
                                <td style={colorCode(data.value)}>{data.color_id}</td>
                                <td>
                                    <IconPhoto style={{
                                        cursor: "pointer"
                                    }} data-bs-toggle="modal" data-bs-target="#imageModal"
                                               onClick={() => {
                                                   handleOpenModal(data.id);
                                               }}
                                    />
                                </td>
                            </tr>)
                        }
                    }
                }
            })}
            </tbody>
        </table>
        <UploadImg data_id={selectedOption !== undefined ? selectedOption : 0} name={fileNames !== undefined ? fileNames : "next.svg"}/>
    </div>)
}