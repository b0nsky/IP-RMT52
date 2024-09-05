function DetailEvent2() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="container-fluid event-container">
      <div className="row justify-content-center">
       <div className="col-md-6 d-flex justify-content-center">
        <img
         src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1583380040/q0nircgb7fayljpzmnzf.png"
         alt="Hammersonic"
         className="detail-img"
        />
       </div>
       <div className="col-md-6 d-flex justify-content-center">
        <div className="event-detail">
         <h2 className="mb-3">Hammersonic</h2>
         <p>
          <strong>Venue:</strong> Ecovention Ancol
         </p>
         <p>
          <strong>Category:</strong> Metal
         </p>
         <p className="price">
          <strong>Price:</strong> Rp 1,000,000
         </p>
         <p className="stock">
          <strong>Stock:</strong> 50 tickets available
         </p>
         <a href="#" className="btn btn-primary detail-btn mx-auto d-block">
          Buy Ticket
         </a>
        </div>
       </div>
      </div>
      <div className="row justify-content-center about-section">
       <div className="col-md-6">
        <div className="event-info">
         <h4>About Hammersonic</h4>
         <p>
          Hammersonic is one of the largest metal music festivals in Southeast
          Asia. It features a wide range of metal bands from around the world
          and is a must-attend event for metal music lovers. Held at the
          Ecovention Ancol, the event promises an unforgettable experience with
          thrilling performances and an electrifying atmosphere.
         </p>
        </div>
       </div>
      </div>
     </div>
    )
}

export default DetailEvent2