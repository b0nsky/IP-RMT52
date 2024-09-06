import { useState } from "react";
import axiosInstance from "../axios/axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditImage() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            Swal.fire({
                icon: "warning",
                title: "No Image Selected",
                text: "Please select an image before submitting.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("imgUrl", selectedImage);

        try {
            const response = await axiosInstance.patch(`/events/${id}/imgUrl`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Swal.fire({
                icon: "success",
                title: "Image Updated",
                text: response.data.message,
            });

            navigate(`/detailevent/${id}`);
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Image Upload Failed",
                text: err.response?.data?.message || "An error occurred while uploading the image.",
            });
        }
    };

    return (
        <div className="edit-image-container">
            <div className="edit-image-form">
                <h2>Update Event Image</h2>
                <form onSubmit={handleUploadImage}>
                    <div className="mb-3">
                        <label htmlFor="imageUpload" className="form-label">Upload New Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="imageUpload" 
                            onChange={handleFileChange} 
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Upload Image</button>
                </form>
            </div>
        </div>
    );
}

export default EditImage;
