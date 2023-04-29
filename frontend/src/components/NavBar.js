import { NavLink, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../features/auth/authSlice"

export default function NavBar({ isAuthenticated }) {
    const dispatch = useDispatch()

    function onLogout() {
        try {
            dispatch(logout())
        } catch (error) {
            console.log(error)
        }
    }

    const userLinks = (
        <>
            <Link className="navbar-brand" to="">Menu</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link" to='appts'>Appointments</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='addDevice'>Devices</Link></li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                    <li className="nav-item">
                        <button type="button" className="btn btn-light" onClick={onLogout}>Log Out</button>
                    </li>
                </ul>
            </div>
        </>
    )

    const guestLinks = (

        <>
            <Link className="navbar-brand" to="">
                Dorm
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                    <li className="nav-item">
                        <NavLink to='/login'><button type="button" className="btn btn-light">Log In</button></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/register'><button type="button" className="btn btn-light">Register</button></NavLink>
                    </li>
                </ul>
            </div>
        </>
    )

    return (
        <div className="mb-3">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
            </nav >
        </div >
    )
}