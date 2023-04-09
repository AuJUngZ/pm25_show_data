import React, {useEffect, useState} from "react";
import {IconPhoto} from "@tabler/icons-react";
import axios from "axios";
import {DatePicker, LocalizationProvider, TimeClock, TimeField} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";

interface Props {
    listOfCity: string[]
}

export default function Table({listOfCity}: Props) {
    const [sortedBy, setSortedBy] = useState<string>("value ASC");
    const [result, setResult] = useState<any>([]);
    const [startDate, setStartDate] = useState<string>("2023-04-09");
    const [endDate, setEndDate] = useState<string>("2023-04-09");
    const [startTime, setStartTime] = useState<string>("08:00:00");
    const [endTime, setEndTime] = useState<string>("09:00:00");


    //GET DATA FROM API
    const fetchData = async (temp: string[]) => {
        axios.defaults.baseURL = 'http://localhost/pm25';
        console.log("start_date: " + startDate + " end_date: " + endDate + " start_time: " + startTime + " end_time: " + endTime);
        const response = await axios.get(`/data/fetch/${temp[0]}`, {
            headers: {
                "sort_order": temp[1],
                "start_date": startDate,
                "end_date": endDate,
                "start_time": startTime,
                "end_time": endTime
            }
        });
        console.log(response.data)
        setResult(response.data);
    }

    useEffect(() => {
        const temp = sortedBy.split(" ");
        try {
            fetchData(temp)
        } catch (e) {
            console.log(e)
        }
    }, [sortedBy, startDate, endDate, startTime, endTime,listOfCity])



    const handleStartDate = (e: any) =>{
        const yyyy = e.$y;
        const mm = e.$M + 1;
        const dd = e.$D;
        const date = `${yyyy}-${mm}-${dd}`;
        setStartDate(date)
    }

    const handleEndDate = (e: any) =>{
        const yyyy = e.$y;
        const mm = e.$M + 1;
        const dd = e.$D;
        const date = `${yyyy}-${mm}-${dd}`;
        setEndDate(date)
    }

    const handleStartTime = (e: any) =>{
        const hh = e.$H;
        const mm = e.$m;
        const ss = e.$s;
        const time = `${hh}:${mm}:${ss}`;
        setStartTime(time)
    }

    const handleEndTime = (e: any) =>{
        const hh = e.$H;
        const mm = e.$m;
        const ss = e.$s;
        const time = `${hh}:${mm}:${ss}`;
        setEndTime(time)
    }

    return (
        <div>
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
                                defaultValue={dayjs("2023-04-09")}
                            />
                            <DatePicker
                                label="End Date"
                                format={"YYYY-MM-DD"}
                                onChange={(e) => {
                                    handleEndDate(e)
                                }}
                                defaultValue={dayjs("2023-04-09")}
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
                                defaultValue={dayjs("2022-04-17T08:00:00")}
                            />
                            <TimeField
                                label="End Time"
                                format={"HH:mm:ss"}
                                onChange={(e) => {
                                    handleEndTime(e)
                                }}
                                defaultValue={dayjs("2022-04-17T09:00:00")}
                            />
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
            <table className="table table-striped table-bordered text-center">
                <thead>
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
                {result.map((data: any, index: any) => {
                    for (let i = 0; i < listOfCity.length; i++) {
                        if (data.areaTH.includes(listOfCity[i]) || data.nameTH.includes(listOfCity[i])) {
                            return (
                                //check if data contain the keyword in listOfCity
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.station_id}</td>
                                    <td>{data.nameTH}</td>
                                    <td>{data.areaTH}</td>
                                    <td>{data.date}</td>
                                    <td>{data.time}</td>
                                    <td>{data.aqi}</td>
                                    <td>{data.value}</td>
                                    <td>{data.color_id}</td>
                                    <td>
                                        <IconPhoto style={{
                                            cursor: "pointer"
                                        }}/>
                                    </td>
                                </tr>
                            )
                        }
                    }
                })}
                </thead>
            </table>
        </div>
    )
}