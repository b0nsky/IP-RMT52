function HomePage() {
    try {
        
    } catch (err) {
        
    }

    return (
     <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <div className="container">
        <img
         src="https://cdn.you.com/youagent-images/dalle3/db70868d-f961-4162-87f2-4a3c872c12d0.png"
         alt="8 Entertainment"
         height={60}
        />
        <button
         className="navbar-toggler"
         type="button"
         data-bs-toggle="collapse"
         data-bs-target="#navbarNav"
         aria-controls="navbarNav"
         aria-expanded="false"
         aria-label="Toggle navigation"
        >
         <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
           <a className="nav-link active" aria-current="page" href="#">
            Home
           </a>
          </li>
          <li className="nav-item">
           <a className="nav-link" href="#">
            Events
           </a>
          </li>
          <li className="nav-item">
           <a className="nav-link" href="#">
            Categories
           </a>
          </li>
         </ul>
         <a href="/login" className="btn btn-outline-primary ms-auto">
          Login
         </a>
        </div>
       </div>
      </nav>
      <div className="container mt-5">
       <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="flex-grow-1 text-left">Events</h1>
        <a href="/add-event" className="btn btn-success ms-3">
         Add New Event
        </a>
       </div>
       <div className="row">
        <div className="col-md-4 d-flex">
         <div className="card mb-4 shadow-sm h-100">
          <img
           src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1583380040/q0nircgb7fayljpzmnzf.png"
           className="card-img-top img-fluid event-img"
           alt="Hammersonic"
          />
          <div className="card-body d-flex flex-column">
           <h5 className="card-title">Hammersonic</h5>
           <p className="card-text">Venue: Ecovention Ancol</p>
           <p className="card-text">Price: Rp 1,000,000</p>
           <a href="#" className="btn btn-light mt-auto">
            Details
           </a>
          </div>
         </div>
        </div>
        <div className="col-md-4 d-flex">
         <div className="card mb-4 shadow-sm h-100">
          <img
           src="https://asset.kompas.com/crops/AFAzOjq-Va44fqzFX7_9lE5Zwms=/0x31:669x477/750x500/data/photo/2022/11/12/636fa846d82be.png"
           className="card-img-top img-fluid event-img"
           alt="Blackpink Tour"
          />
          <div className="card-body d-flex flex-column">
           <h5 className="card-title">Blackpink Tour</h5>
           <p className="card-text">Venue: Stadion Utama Gelora Bung Karno</p>
           <p className="card-text">Price: Rp 1,500,000</p>
           <a href="#" className="btn btn-light mt-auto">
            Details
           </a>
          </div>
         </div>
        </div>
        <div className="col-md-4 d-flex">
         <div className="card mb-4 shadow-sm h-100">
          <img
           src="https://awsimages.detik.net.id/community/media/visual/2022/04/06/java-jazz-festival-2022_43.jpeg?w=1200"
           className="card-img-top img-fluid event-img"
           alt="Java Jazz Festival"
          />
          <div className="card-body d-flex flex-column">
           <h5 className="card-title">Java Jazz Festival</h5>
           <p className="card-text">Venue: JIExpo-Kemayoran</p>
           <p className="card-text">Price: Rp 500,000</p>
           <a href="#" className="btn btn-light mt-auto">
            Details
           </a>
          </div>
         </div>
        </div>
        <div className="col-md-4 d-flex">
         <div className="card mb-4 shadow-sm h-100">
          <img
           src="https://pophariini.com/wp-content/uploads/2022/11/ECE0D64D-39DB-44C5-910C-C36C09132BE0.jpeg"
           className="card-img-top img-fluid event-img"
           alt="Soundrenaline"
          />
          <div className="card-body d-flex flex-column">
           <h5 className="card-title">Soundrenaline</h5>
           <p className="card-text">Venue: Sirkuit Carnaval Ancol</p>
           <p className="card-text">Price: Rp 200,000</p>
           <a href="#" className="btn btn-light mt-auto">
            Details
           </a>
          </div>
         </div>
        </div>
       </div>
      </div>
     </>
    )
}