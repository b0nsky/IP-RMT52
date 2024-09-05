import '../App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function HomepageCard2({ events }) {
    return (
    <div className="col-md-4 d-flex">
        <div className="card mb-4 shadow-sm h-100">
        <img
            src={events.imgUrl}
            className="card-img-top img-fluid event-img"
            alt={events.eventName}
        />
        <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center">{events.eventName}</h3>
                <p className="card-text text-center">Venue : {events.venue}</p>
                <p className="card-text text-center">Price : Rp {events.price.toLocaleString()}</p>
                <Link to={`/detailevent/${events.id}`} className="btn btn-light mt-auto">
                    Details
                </Link>
            </div>
        </div>
    </div>
    );
}

HomepageCard2.propTypes = {
    events: PropTypes.shape({
        id: PropTypes.number.isRequired,
        eventName: PropTypes.string.isRequired,
        venue: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
};

export default HomepageCard2;
