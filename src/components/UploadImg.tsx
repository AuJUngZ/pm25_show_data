import React, {useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";


interface Props {
    data_id: number,
    name : string
}

export default function UploadImg({data_id, name}: Props) {
    let [image, setImage] = React.useState<string>("");

    const handleUpload = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost/pm25';
            const image = document.getElementById("image") as HTMLInputElement;
            const formData = new FormData();
            // @ts-ignore
            formData.append("image", image.files[0]);
            const response = await axios.post("/upload-img/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "data_id": data_id,
                    "token": "1234567890"
                }
            });
            if (response.status === 200) {
                Uploaded();
                clearInput();
                clearModal();
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(name !== "next.svg"){
            setImage(`http://localhost/pm25/public/img/${name}`);
        }else{
            setImage(`/next.svg`);
        }
    },[name])

    const clearModal = () => {
        const modal = document.getElementById("imageModal") as HTMLInputElement;
        modal.click();
    }

    const clearInput = () => {
        const image = document.getElementById("image") as HTMLInputElement;
        image.value = ""
    }

    const Uploaded = () =>{
        Swal.fire({
            title: 'Success!',
            text: 'Image has been uploaded',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

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
                                onClick={clearInput}
                        >Close
                        </button>
                        <button className={"btn btn-primary"}
                                onClick={handleUpload}
                        >Upload
                        </button>
                    </div>
                    <hr/>
                    <div className={"show image mb-5 mx-auto text-center"}>
                        <h5>Image Preview</h5>
                        <img src={image} width={300} height={300} alt={"img"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}