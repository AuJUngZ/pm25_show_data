import axios from "axios";
import dayjs from "dayjs";

export const handleOpenModal = async (id : number, setFileNames : any, setSelectedOption : any)=>{
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
    } catch (e) {
        console.log(e)
    }
}


export const fetchData = async (temp: string[], setResult: any, startDate: string, endDate: string, startTime: string, endTime: string) =>{
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

export const getCurrentDate = () =>{
    // @ts-ignore
    const {$D: dd, $M, $y: yyyy} = dayjs(new Date());
    const mm = $M + 1;
    return `${yyyy}-${mm}-${dd}`
}

export const handleStartDate = (e: any, setStartDate: any) =>{
    const {$y: yyyy, $M, $D: dd} = e;
    const mm = $M + 1;
    const date = `${yyyy}-${mm}-${dd}`;
    setStartDate(date)
}

export const handleEndDate = (e: any, setEndDate: any) =>{
    const {$y: yyyy, $M, $D: dd} = e;
    const mm = $M + 1;
    const date = `${yyyy}-${mm}-${dd}`;
    setEndDate(date)
}

export const handleStartTime = (e: any, setStartTime: any) =>{
    const hh = e.$H;
    const mm = e.$m;
    const ss = e.$s;
    const time = `${hh}:${mm}:${ss}`;
    setStartTime(time)
}

export const handleEndTime = (e: any, setEndTime: any) =>{
    const hh = e.$H;
    const mm = e.$m;
    const ss = e.$s;
    const time = `${hh}:${mm}:${ss}`;
    setEndTime(time)
}

export const colorCode = (code: number) =>{
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
