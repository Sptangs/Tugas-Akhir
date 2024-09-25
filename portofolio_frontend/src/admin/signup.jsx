import React, { useState } from 'react';

const SignUp = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const userData = {
            nama: event.target.nama.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign-up failed');
            }

            const data = await response.json();
            setSuccess('Sign-up successful! Please log in.');
            event.target.reset();
            window.location.href = '/login';
        } catch (error) {
            setError(error.message); 
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                <div className="form-group">
                    <label htmlFor="nama">Nama Lengkap:</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        className="form-control"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>
                {error && <p className="text-danger text-center mt-2">{error}</p>}
                {success && <p className="text-success text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default SignUp;
