import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axios';
import HomepageCard from '../component/HomepageCard';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function HomePage() {
    const [events, setEvents] = useState([]);

    const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/pub/events');
        setEvents(response.data);
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Oops....",
            text: `${err.response?.data?.error || "An error occurred"}`,
        });
    }
};

useEffect(() => {
    fetchData();
    }, []);

    return (
        <>

    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="flex-grow-1 text-left">Events</h1>
            <Link to="/addevent" className="btn btn-success ms-3">
                Add New Event
            </Link>
        </div>

        <div className="row">
            {events.map((event) => (
                <HomepageCard
                    key={event.id}
                    events={{
                        id: event.id,
                        eventName: event.eventName,
                        venue: event.venue,
                        imgUrl: event.imgUrl,
                        price: event.price,
                    }}
                />
            ))}
            </div>
        </div>
        </>
    );
}

export default HomePage;
