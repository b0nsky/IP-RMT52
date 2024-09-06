import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {
    const [categoryName, setCategoryName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCategoryDetails = async () => {
        try {
            const { data } = await axiosInstance.get(`/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setCategoryName(data.name);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${err.response?.data?.message || "Failed to fetch category data"}`,
            });
            navigate("/categories");
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, [id]);

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.put(
                `/categories/${id}`,
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Category Berhasil di Update",
            });
            navigate("/categories");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal Mengupdate Category",
                text: "Anda Bukan Admin",
            });
        }
    };

    return (
        <div className="container add-category-container">
            <div className="add-category-form">
                <h2 className="mb-4 text-center">Update Category</h2>
                <form onSubmit={handleUpdateCategory}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoryName"
                            name="name"
                            placeholder="Enter new name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto d-block">
                        Update Category
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCategory;
