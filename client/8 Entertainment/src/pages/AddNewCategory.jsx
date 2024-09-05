function AddNewCategory() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="container add-category-container">
      <div className="add-category-form">
       <h2 className="mb-4 text-center">Add New Category</h2>
       <form action="/add-category" method="POST">
        <div className="mb-3">
         <label htmlFor="categoryName" className="form-label">
          Category Name
         </label>
         <input
          type="text"
          className="form-control"
          id="categoryName"
          name="name"
          placeholder="Enter new category name"
          required=""
         />
        </div>
        <button type="submit" className="btn btn-primary mx-auto d-block">
         Add Category
        </button>
       </form>
      </div>
     </div>
    )
}