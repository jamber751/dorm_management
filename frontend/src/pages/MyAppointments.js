import { useEffect } from 'react'
import { formatTimeslot, formatDate} from './Appointments'
import { useSelector, useDispatch } from 'react-redux'
import { cancelAppt, myAppt } from '../features/appt/apptSlice'

export default function MyAppointments() {
    const { appointments } = useSelector((state) => state.appt)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(myAppt())
    }, [dispatch])

    function onDelete(id) {
        // Cancel the appointmen on the server and refresh the table
        // id = appointment id
        const userData = {
            id
        }
        dispatch(cancelAppt(userData))
        dispatch(myAppt())
    }

    return (

        <div className="container text-center">
            <h3 className="mb-3">My Appointmets</h3>
            <MyAppointmentsTable appts={appointments} onDelete={onDelete} />
        </div>

    )
}

function MyAppointmentsTable({ appts, onDelete }) {
    let rows = []
    for (let id in appts) {
        rows.push(
            <MyAppointmentsTableRow key={appts[id].id} appt={appts[id]} onDelete={onDelete} />
        )
    }
    return (
        <table className="table table-striped align-middle">
            <thead>
                <tr>
                    <th className='w-25'>date</th>
                    <th className='w-25'>timeslot</th>
                    <th className='w-auto'>machine</th>
                    <th className='w-25'>cancel</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    )
}

function MyAppointmentsTableRow({ appt, onDelete }) {
    return (
        <tr>
            <td>
                {formatDate(appt.date)}
            </td>
            <td>
                {formatTimeslot(appt.timeslot)}
            </td>
            <td>
                {appt.machine + 1}
            </td>
            <td>
                <button data-id={appt.id} type="button" className="btn btn-outline-secondary" onClick={(e) => { onDelete(e.target.dataset.id) }}>cancel</button>
            </td>
        </tr>
    )
}