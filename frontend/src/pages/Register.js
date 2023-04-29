import { useState } from "react"
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'



export default function Register({ toast }) {
    const [formData, setformData] = useState({
        username: '',
        room_number: '',
        password: '',
        confirmation: ''
    })

    const { username, room_number, password, confirmation } = formData

    function onChange(e) {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }  
    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        if (password !== confirmation) {
            toast.error('Passwords do not match')
            return
        }

        let userData = {
            username,
            password,
            confirmation,
            room_number
        }
        try {
            dispatch(register(userData))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container-sm p-5 mt-5 pt-3 auth-box">
            <div className="text-center mb-3">
                <h1>Register</h1>
                <p className="lead">to use the Dorm App</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-floating mb-3">
                    <input
                        autoComplete="off"
                        type="text"
                        name="username"
                        className="form-control"
                        id="username" placeholder="username"
                        onChange={onChange}
                        value={username}
                    />
                    <label htmlFor="floatingInput">username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        autoComplete="off"
                        type="number"
                        name="room_number"
                        className="form-control"
                        id="room_number"
                        placeholder="0000"
                        onChange={onChange}
                        value={room_number}
                    />
                    <label htmlFor="room_number">room number</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        autoComplete="off"
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                        onChange={onChange}
                        value={password}
                    />
                    <label htmlFor="password">password</label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        autoComplete="off"
                        type="password"
                        name="confirmation"
                        className="form-control"
                        id="confirmation"
                        placeholder="confirm password"
                        onChange={onChange}
                        value={confirmation}
                    />
                    <label htmlFor="confirmation">confirm password</label>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-secondary btn-lg" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}