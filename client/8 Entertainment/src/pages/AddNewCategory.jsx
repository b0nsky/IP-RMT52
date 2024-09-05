import { useState } from "react";
import axiosInstance from "../axios/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddNewCategory() {
    const [categoryName, setCategoryName] = useState("");
    const navigate = useNavigate();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(
                "/categories",
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            
            Swal.fire({
                icon: "success",
                title: "Berhasil Menambahkan Category",
            });
            
            navigate("/categories");
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Gagal Menambahkan Category",
                text: `${err.response?.data?.error || "Anda Bukan Admin"}`,
            });
        }
    };

    return (
        <div className="container add-category-container">
            <div className="add-category-form">
                <h2 className="mb-4 text-center">Add New Category</h2>
                <form onSubmit={handleAddCategory}>
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
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto d-block">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddNewCategory;
