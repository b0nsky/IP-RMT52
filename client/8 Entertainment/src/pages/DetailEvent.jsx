import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DetailEvent() {
    const [event, setEvent] = useState(null);
    const [generatedDescription, setGeneratedDescription] = useState(''); 
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        try {
            const { data } = await axiosInstance.get(`/pub/events/${id}`);
            setEvent(data);

            const descriptionResponse = await axiosInstance.post(
                `/pub/events/${id}/generate-description`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
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
        try {
            const { data } = await axiosInstance.patch(`/events/${id}/buy`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Login Terlebih Dahulu",
                text: err.response?.data?.message || "An error occurred while purchasing the ticket.",
            });
            navigate('/login')
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
                        <button 
                            onClick={handleBuyTicket} 
                            className="btn btn-primary detail-btn mx-auto d-block"
                            disabled={event.stock <= 0}
                        >
                            Buy Ticket
                        </button>
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

export default DetailEvent;
