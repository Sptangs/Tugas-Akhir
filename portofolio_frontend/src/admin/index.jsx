import React  from "react";
import {Outlet} from "react-router-dom";

const Index = () => {
    if(localStorage.getItem('token') != null) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container-fluid">
                        <a href="#" className="navbar-brand">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="#navbarNavAltMarkup" aria-expanded="false" aria-label="toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collpase navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <a href="/admin/home" className="nav-link active">Home</a>    
                            <a href="/admin/tamu" className="nav-link">Tamu</a>    
                            <a href="/admin/user" className="nav-link">User</a>    
                            </div>    
                        </div> 
                    </div>
                    <span className="d-flex">
                        <a href="/logout" className="btn btn-primary">Logout</a>
                    </span>
                </nav>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Index