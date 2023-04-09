import {useState} from "react";
import Table from "@/components/Table";

export default function Search() {
    const [city, setCity] = useState<string>("");
    const [listOfCities, setListOfCities] = useState<string[]>(["เชียงใหม่", "เชียงราย"]);
    return (
        <div className={"container"}>
            <div className={"d-flex justify-content-center flex-column mb-5"} style={{
                maxWidth: "650px",
                margin: "0 auto"
            }}>
                <h3 className={"text-primary text-center mb-4 fw-light"}>Please input your city that you want</h3>
                {/*search bar*/}
                <div className={"searchBar"}>
                    <div className={"input-group mb-3"}>
                        <span className="input-group-text" id="basic-addon1">Enter your city</span>
                        <input type="text" className="form-control" placeholder="city" aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={city}
                               onKeyUp={(e) => {
                                  if(e.key === "Enter"){
                                      listOfCities.push(city)
                                      setCity("")
                                  }
                               }}
                               onChange={(e) => {
                                   setCity(e.target.value)
                               }}
                        />
                    </div>
                </div>

                {/*  show list of city can remove*/}
                <div className={"listOfCity"}>
                    <ul className="list-group">
                        {listOfCities.map((city) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    key={city}>
                                    {city}
                                    <button type="button" className="btn btn-danger"
                                        onClick = {() => {
                                            setListOfCities(listOfCities.filter((item) => item !== city))
                                        }}
                                    >Remove</button>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
            <hr/>
            <Table listOfCity={listOfCities}/>
        </div>
    )
}