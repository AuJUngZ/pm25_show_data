import React, {useEffect, useState} from "react";
import {IconPhoto} from "@tabler/icons-react";
import axios from "axios";
import {DatePicker, LocalizationProvider, TimeField} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import UploadImg from "@/components/UploadImg";
import {handleOpenModal, fetchData, getCurrentDate, handleStartDate, handleEndDate, handleStartTime, handleEndTime, colorCode} from "@/utils/Table_Util";

interface Props {
    listOfCity: string[]
}

export default function Table({listOfCity}: Props) {
    const [sortedBy, setSortedBy] = useState<string>("value ASC");
    const [result, setResult] = useState<any>([]);
    const [startDate, setStartDate] = useState<string>(getCurrentDate);
    const [endDate, setEndDate] = useState<string>(getCurrentDate);
    const [startTime, setStartTime] = useState<string>("08:00:00");
    const [endTime, setEndTime] = useState<string>("23:00:00");
    const [selectedOption, setSelectedOption] = useState<number>();
    const [fileNames, setFileNames] = useState<string>();

    useEffect(() => {
        const temp = sortedBy.split(" ");
        try {
            fetchData(temp , setResult, startDate, endDate, startTime, endTime);
        } catch (e) {
            console.log(e)
        }
    }, [sortedBy, startDate, endDate, startTime, endTime, listOfCity])

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
                                handleStartDate(e, setStartDate);
                            }}
                            value={startDate !== getCurrentDate() ? dayjs(startDate) : dayjs(new Date())}
                        />
                        <DatePicker
                            label="End Date"
                            format={"YYYY-MM-DD"}
                            onChange={(e) => {
                                handleEndDate(e, setEndDate);
                            }}
                            value={endDate !== getCurrentDate() ? dayjs(endDate) : dayjs(new Date())}
                        />
                    </div>
                    <div>
                        <TimeField
                            label="Start Time"
                            format={"HH:mm:ss"}
                            className={"me-2"}
                            onChange={(e) => {
                                handleStartTime(e, setStartTime);
                            }}
                            value={startTime !== "08:00:00" ? dayjs(`2023-04-17T${startTime}`) : dayjs("2023-04-17T08:00:00")}
                        />
                        <TimeField
                            label="End Time"
                            format={"HH:mm:ss"}
                            onChange={(e) => {
                                handleEndTime(e, setEndTime)
                            }}
                            value={endTime !== "23:00:00" ? dayjs(`2023-04-17T${endTime}`) : dayjs("2023-04-17T23:00:00")}
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
                                           handleOpenModal(data.id, setFileNames, setSelectedOption);
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
                                                   handleOpenModal(data.id,setFileNames, setSelectedOption);
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