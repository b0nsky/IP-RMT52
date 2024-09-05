function Login() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="login-container">
      <div className="col-md-6 login-left">
       <img
        src="https://cdn.you.com/youagent-images/dalle3/db70868d-f961-4162-87f2-4a3c872c12d0.png"
        alt="8Entertainment Logo"
        className="login-logo"
       />
      </div>
      <div className="col-md-6 login-right">
       <div className="container">
        <h2 className="text-center mb-4">Login</h2>
        <form action="/login" method="POST">
         <div className="mb-3">
          <label htmlFor="email" className="form-label">
           Email address
          </label>
          <input
           type="email"
           className="form-control"
           id="email"
           name="email"
           placeholder="Enter your email"
           required=""
          />
         </div>
         <div className="mb-3">
          <label htmlFor="password" className="form-label">
           Password
          </label>
          <input
           type="password"
           className="form-control"
           id="password"
           name="password"
           placeholder="Enter your password"
           required=""
          />
         </div>
         <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
           Login
          </button>
         </div>
        </form>
       </div>
      </div>
     </div>
    )
}