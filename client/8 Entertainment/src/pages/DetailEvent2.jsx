import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DetailEvent2() {
    const [event, setEvent] = useState(null);
    const [generatedDescription, setGeneratedDescription] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        try {
            const { data } = await axiosInstance.get(`/pub/events/${id}`);
            setEvent(data);

            const descriptionResponse = await axiosInstance.post(
                `/events/${id}/generate-description`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    }
                }
            );
            setGeneratedDescription(descriptionResponse.data.description);
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

    const handleBuyTicket = async () => {
        if (event.stock <= 0) {
            Swal.fire({
                icon: "error",
                title: "Out of Stock",
                text: "Sorry, Tiket ini telah sold out.",
            });
            return;
        }

        try {
            const { data } = await axiosInstance.patch(`/events/${id}/buy`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setEvent((prevEvent) => ({
                ...prevEvent,
                stock: prevEvent.stock - 1,
            }));

            Swal.fire({
                icon: "success",
                title: "Ticket Berhasil di Beli",
                text: "Anda Berhasil Membeli Tiket!",
            });
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Purchase Failed",
                text: err.response?.data?.message || "An error occurred while purchasing the ticket.",
            });
        }
    };

    if (!event) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="container-fluid event-container">
            <div className="row justify-content-center">
                <div className="col-md-6 d-flex justify-content-center">
                    <img
                        src={event.imgUrl}
                        alt={event.eventName}
                        className="detail-img"
                    />
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <div className="event-detail">
                        <h2 className="mb-3">{event.eventName}</h2>
                        <p>
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p>
                            <strong>Category:</strong> {event.category?.name || "Category not available"}
                        </p>
                        <p className="price">
                            <strong>Price:</strong> Rp {event.price.toLocaleString()}
                        </p>
                        <p className="stock">
                            <strong>Stock:</strong> {event.stock} tickets available
                        </p>
                        <div className="d-flex justify-content-between">
                            <button 
                                onClick={handleBuyTicket} 
                                className="btn btn-primary m-2"
                                disabled={event.stock <= 0}
                            >
                                Buy Ticket
                            </button>
                            <Link to={`/updateevent/${event.id}`} className="btn btn-warning m-2">
                                Edit Event
                            </Link>
                            <button 
                                onClick={() => navigate(`/detailevent/${event.id}/edit-image`)} 
                                className="btn btn-secondary m-2"
                            >
                                Edit Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center about-section">
                <div className="col-md-6">
                    <div className="event-info">
                        <h4>About {event.eventName}</h4>
                        <p>{generatedDescription}</p> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailEvent2;
