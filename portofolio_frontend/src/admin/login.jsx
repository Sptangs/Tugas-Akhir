    import React, { useState } from 'react';

    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();
            setError('');
            setSuccess('');
        
            const fData = {
                email: event.target.email.value,
                password: event.target.password.value,
            };
        
            try {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    mode:"cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(fData),
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }
        
                const data = await response.json();
                localStorage.setItem('token', data.token);
                event.target.reset();
                setSuccess('Login successful!');
                window.location.href = '/components';
            } catch (error) {
                setError(error.message); 
            }
        };
        

        return (
            <div className="container mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                    <div className="form-group">
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
                    <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    {success && <p className="text-success text-center mt-2">{success}</p>}
                </form>
            </div>
        );
    };

    export default Login;
