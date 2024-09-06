import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateEvent() {
    const [event, setEvent] = useState({
        eventName: "",
        venue: "",
        imgUrl: "",
        price: 0,
        categoryId: 0,
        userId: 0,
        stock: 0,
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        try {
            const { data } = await axiosInstance.get(`/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setEvent(data);
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch event details",
            });
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    const handleUpdateEvent = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axiosInstance.put(`/events/${id}`, event, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            Swal.fire({
                icon: "success",
                title: "Event Updated",
                text: `Event '${data.eventName}' Berhasil di Update!`,
            });

            navigate(`/detailevent/${id}`)
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Anda Bukan Admin",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    return (
        <div className="container add-event-container">
            <div className="add-event-form">
                <h2 className="mb-4 text-center">Update Event</h2>
                <form onSubmit={handleUpdateEvent}>
                    <div className="mb-3 form-group">
                        <label htmlFor="eventName" className="form-label">
                            Event Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="eventName"
                            name="eventName"
                            value={event.eventName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="venue" className="form-label">
                            Venue
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="venue"
                            name="venue"
                            value={event.venue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="imgUrl" className="form-label">
                            Image URL
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name="imgUrl"
                            value={event.imgUrl}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="price" className="form-label">
                            Price (Rp)
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={event.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="categoryId" className="form-label">
                            Category ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="categoryId"
                            name="categoryId"
                            value={event.categoryId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="userId" className="form-label">
                            User ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="userId"
                            name="userId"
                            value={event.userId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="stock" className="form-label">
                            Stock
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            name="stock"
                            value={event.stock}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto d-block">
                        Update Event
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEvent;
