import axios from 'axios'
import { useState } from "react"
import { getCSRF } from "../features/auth/authService"

export default function AddDevice({ toast }) {
    const [formData, setformData] = useState({
        mac: '',
        type: ''
    })
    const { mac, type } = formData

    function onChange(e) {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        const mac_address = mac.trim().split(':')
        if (mac_address.length !== 6) {
            toast.error('Invalid MAC Address')
            return
        }
        for (let id in mac_address) {
            if (mac_address[id].length !== 2) {
                toast.error('Invalid MAC Address')
                return
            }
            if (!isAlphanumeric(mac_address[id])) {
                toast.error('Invalid MAC Address')
                return
            }
        }

        let userData = {
            'mac': mac.trim(),
            'type': type.trim()
        }

        const config = await getCSRF()
        try {
            await axios.post('device/register', userData, config)
            toast.success('Device added')
        } catch (error) {
            toast.error(error.response.data.error)
        }

        setformData((prevState) => ({
            ...prevState,
            mac: '',
            type: ''
        }))
    }


    return (
        <div className="container">
            <div className="mb-5 text-center">
                <h1>Register new device</h1>
                <p className="lead">enter the MAC addres and device type</p>
            </div>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <p className="lead fw-bold">Mac Address</p>
                    <label className="form-label">ex. 44:38:39:ff:ef:57</label>
                    <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="mac" id="mac"
                        placeholder="mac address"
                        onChange={onChange}
                        value={mac}
                    />
                </div>
                <hr />
                <div className="mb-4">
                    <p className="lead fw-bold">Device type</p>
                    <label className="form-label">ex. MacBook Pro 14' 2022</label>
                    <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="type"
                        id="type"
                        placeholder="device type"
                        onChange={onChange}
                        value={type}
                    />
                </div>
                {/* <hr /> */}
                <div className="">
                    <button type="submit" className="btn btn-secondary">Save</button>
                </div>
            </form>
        </div>
    )
}

export function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}