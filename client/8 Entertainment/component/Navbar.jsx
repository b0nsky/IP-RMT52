function Navbar() {
    try {
        
    } catch (err) {
        
    }

    return (
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
        <button className="btn btn-outline-primary ms-auto" type="button">
         Login
        </button>
       </div>
      </div>
     </nav>
    )
}