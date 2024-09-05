import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";
import Swal from "sweetalert2";

function NewUser() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const handleNewUser = async (e) => {
        e.preventDefault()

        try {
            const {data} = await axiosInstance.post (
                `/new-user`, {
                    email,
                    password,
                    phoneNumber,
                    address
                }
            )
            Swal.fire({
                icon: "success",
                title: "Berhasil Membuat Data Baru",
            });
            navigate('/homepage')
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Membuat Data Baru',
                text: `${err.response.data.error}`
            })
        }
    }

    return (
        <div className="form-container">
            <div className="container">
                <h2 className="text-center mb-4">New User</h2>
                <form onSubmit={handleNewUser}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewUser;