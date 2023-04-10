import axios from "axios";
import Swal from "sweetalert2";


export const handleUpload = async (data_id:number) =>{
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
    } catch (e: any) {
        UploadError(e.message);
    }
}

const clearModal = () => {
    const modal = document.getElementById("imageModal") as HTMLInputElement;
    modal.click();
}

const clearInput = () => {
    const image = document.getElementById("image") as HTMLInputElement;
    image.value = ""
}

export const clearInputExport = () => {
    const image = document.getElementById("image") as HTMLInputElement;
    image.value = ""
}

const Uploaded = () => {
    Swal.fire({
        title: 'Success!',
        text: 'Image has been uploaded',
        icon: 'success',
        confirmButtonText: 'Cool'
    })
}

const UploadError = (e: any) => {
    Swal.fire({
        title: 'Error!',
        text: e,
        icon: 'error',
        confirmButtonText: 'Cool'
    })
}