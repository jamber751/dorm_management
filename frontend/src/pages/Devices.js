import axios from 'axios'
import { useEffect, useState } from 'react'
import { getCSRF } from '../features/auth/authService'


export default function Devices({ toast }) {
    const [devices, setDevices] = useState({})
    const [trigger, setTrigger] = useState()

    useEffect(() => {
        async function getDevices() {
            const config = await getCSRF()
            const response = await axios.get('device/get', {}, config)
            setDevices(response.data)
        }
        getDevices()
    }, [trigger])


    async function onDelete(id) {
        const config = await getCSRF()
        const userData = {
            id
        }

        try {
            const response = await axios.post('device/delete', userData, config)
            toast.success(response.data.message)
        }
        catch (error) {
            toast.error(error.response.data.error)
        }
        setTrigger(id)
    }


    return (
        <div className="container">
            <div className="text-center mb-3">
                <h1>My Devices</h1>
            </div>
            <hr />
            <DevicesTable devices={devices} onDelete={onDelete} />
        </div>
    )
}

function DevicesTable({ devices, onDelete }) {
    let rows = []

    for (let id in devices) {
        rows.push(<DeviceTableRow key={id} device={devices[id]} onDelete={onDelete} />)
    }

    return (
        <table className="table align-middle">
            <thead>
                <tr>
                    <th>MAC Address</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function DeviceTableRow({ device, onDelete }) {
    function onButtonPress(e) {
        onDelete(e.target.dataset.id)
    }
    return (
        <tr>
            <td>
                {device['mac']}
            </td>
            <td>
                {device['type']}
            </td>
            <td>
                {device['confirmed'] ? 'Registered' : 'Pending'}
            </td>
            <td>
                <button type="button" data-id={device['id']} className="btn btn-outline-danger" onClick={onButtonPress}>delete</button>
            </td>
        </tr>
    )
}