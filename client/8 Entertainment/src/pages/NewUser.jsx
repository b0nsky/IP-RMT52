function NewUser() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="form-container">
      <div className="container">
       <h2 className="text-center mb-4">New User</h2>
       <form action="/submit-user" method="POST">
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
        <div className="mb-3">
         <label htmlFor="phoneNumber" className="form-label">
          Phone Number
         </label>
         <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          placeholder=""
          required=""
         />
        </div>
        <div className="mb-3">
         <label htmlFor="address" className="form-label">
          Address
         </label>
         <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          placeholder=""
          required=""
         />
        </div>
        <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-primary">
          Submit
         </button>
        </div>
       </form>
      </div>
     </div>
    )
}