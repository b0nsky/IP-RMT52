function Category() {
    try {
        
    } catch (err) {
        
    }

    return (
     <div className="container category-container">
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
       <h2>Categories</h2>
       <a href="#" className="btn btn-primary">
        Add New Category
       </a>
      </div>
      <ul className="list-group category-list">
       <li className="list-group-item d-flex justify-content-between align-items-center">
        Metal
        <span className="badge bg-primary rounded-pill">1</span>
       </li>
       <li className="list-group-item d-flex justify-content-between align-items-center">
        K-Pop
        <span className="badge bg-primary rounded-pill">2</span>
       </li>
       <li className="list-group-item d-flex justify-content-between align-items-center">
        Jazz
        <span className="badge bg-primary rounded-pill">3</span>
       </li>
       <li className="list-group-item d-flex justify-content-between align-items-center">
        All Genre
        <span className="badge bg-primary rounded-pill">4</span>
       </li>
      </ul>
     </div>
    )
}