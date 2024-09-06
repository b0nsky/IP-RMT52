import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Category() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const { data } = await axiosInstance.get(
                "/categories",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setCategories(data);
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops....",
                text: `${err.response?.data?.error || "An error occurred"}`,
            });
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete!"
            });
            
            if (result.isConfirmed) {
                await axiosInstance.delete(`/categories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Category Berhasil di Hapus'
                })
                setCategories(categories.filter((category) => category.id !== id));
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Gagal Menghapus Data",
                text: `${err.response?.data?.error || "Anda Bukan Admin"}`,
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container category-container">
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <h2>Categories</h2>
                <Link to="/addcategory" className="btn btn-primary">
                    Add New Category
                </Link>
            </div>
            <ul className="list-group category-list">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="badge bg-primary rounded-pill me-3">{index + 1}</span>
                                {category.name}
                            </div>
                            <div>
                                <Link to={`/updatecategory/${category.id}`} className="btn btn-warning btn-sm me-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No categories available</li>
                )}
            </ul>
        </div>
    );
}

export default Category;
