import React, {useEffect} from "react";
import {clearInputExport, handleUpload,} from "@/utils/UploadImg_Util";


interface Props {
    data_id: number,
    name: string
}

export default function UploadImg({data_id, name}: Props) {
    let [image, setImage] = React.useState<string>("");

    useEffect(() => {
        if (name !== "next.svg") {
            setImage(`http://localhost/pm25/public/img/${name}`);
        } else {
            setImage(`/next.svg`);
        }
    }, [name])

    return (
        <div className={"modal fade"} id={"imageModal"} aria-labelledby="imageModalLabel" aria-hidden="true">
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"imageModalLabel"}>Upload Image for data ID : {data_id}</h5>
                        <button className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={"modal-body"}>
                        <form>
                            <div className={"mb-3"}>
                                <label htmlFor={"image"} className={"form-label"}>Image</label>
                                <input type={"file"}
                                       className={"form-control"}
                                       id={"image"}
                                />
                            </div>
                        </form>
                    </div>
                    <div className={"modal-footer"}>
                        <button className={"btn btn-secondary"} data-bs-dismiss="modal"
                            //clear input file
                                onClick={() => {
                                    clearInputExport();
                                }}
                        >Close
                        </button>
                        <button className={"btn btn-primary"}
                                onClick={() => {
                                    handleUpload(data_id);
                                }}
                        >Upload
                        </button>
                    </div>
                    <hr/>
                    <div className={"show image mb-5 mx-auto text-center"}>
                        <h5>Image Preview</h5>
                        <img src={image} width={400} height={300} alt={"img"}
                             style={{
                                 // objectFit: "cover",
                                 // objectPosition: "center",
                                 borderRadius: "10px",
                             }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}