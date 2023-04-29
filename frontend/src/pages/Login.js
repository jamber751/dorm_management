import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"

export default function Login() {
    const [formData, setformData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData

    function onChange(e) {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        const userData = {
            username,
            password
        }
        try {
            dispatch(login(userData))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container p-5 mt-5 pt-3 auth-box">
            <div className="text-center">
                <h1>Log In</h1>
                <p className="lead">to use the dorm app</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-floating mb-3">
                    <input
                        autoComplete="off"
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        placeholder="0000"
                        onChange={onChange}
                        value={username}
                    />
                    <label htmlFor="username">username</label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        autoComplete="off"
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={onChange}
                        value={password}
                    />
                    <label htmlFor="password">password</label>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-secondary btn-lg" type="submit">Sing In</button>
                </div>
            </form>
        </div>
    )
}