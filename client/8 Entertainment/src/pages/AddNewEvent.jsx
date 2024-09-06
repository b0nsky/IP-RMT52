import { useState } from "react";
import axiosInstance from "../axios/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddNewEvent() {
    const [eventName, setEventName] = useState("");
    const [venue, setVenue] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState("");
    const [userId, setUserId] = useState("");
    const [stock, setStock] = useState(0);
    
    const navigate = useNavigate();

    const handleAddEvent = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axiosInstance.post(
                "/events",
                {
                    eventName,
                    venue,
                    imgUrl,
                    price,
                    categoryId,
                    userId,
                    stock,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            
            Swal.fire({
                icon: "success",
                title: "Berhasil Menambahkan Data Event",
                text: `Event '${data.eventName}' Berhasil diTambahkan!`,
            });
            
            navigate("/homepage");
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Gagal Menambahkan Data Event",
                text: "Anda Bukan Admin"
            });
        }
    };

    return (
        <div className="container add-event-container">
            <div className="add-event-form">
                <h2 className="mb-4 text-center">New Event</h2>
                <form onSubmit={handleAddEvent}>
                    <div className="mb-3 form-group">
                        <label htmlFor="eventName" className="form-label">Event Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="eventName"
                            name="eventName"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="venue" className="form-label">Venue</label>
                        <input
                            type="text"
                            className="form-control"
                            id="venue"
                            name="venue"
                            placeholder="Enter venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="imgUrl" className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name="imgUrl"
                            placeholder="Enter image URL"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="price" className="form-label">Price (Rp)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="categoryId" className="form-label">Category ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="categoryId"
                            name="categoryId"
                            placeholder="Enter category ID"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="userId" className="form-label">User ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="userId"
                            name="userId"
                            placeholder="Enter user ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            name="stock"
                            placeholder="Enter stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto d-block">
                        Add Event
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddNewEvent;
