function AddNewEvent() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="container add-event-container">
      <div className="add-event-form">
       <h2 className="mb-4 text-center">New Event</h2>
       <form action="/add-event" method="POST">
        <div className="mb-3 form-group">
         <label htmlFor="eventName" className="form-label">
          Event Name
         </label>
         <input
          type="text"
          className="form-control"
          id="eventName"
          name="eventName"
          placeholder=""
          required=""
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
          placeholder=""
          required=""
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
          placeholder=""
          required=""
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
          placeholder="example: 100000"
          required=""
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
          placeholder=""
          required=""
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
          placeholder=""
          required=""
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
          placeholder="Enter stock"
          required=""
         />
        </div>
        <button type="submit" className="btn btn-primary mx-auto d-block">
         Add Event
        </button>
       </form>
      </div>
     </div>
    )
}

export default AddNewEvent