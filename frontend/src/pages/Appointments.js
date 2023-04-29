import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookAppt, getAppts } from '../features/appt/apptSlice'


export default function Appointments({ toast }) {
    // Get the current date
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    today = year + "-" + month + "-" + day;
    const [date, setDate] = useState(today)

    // Get the appointments from the server and set up machines count
    const machinesCount = 2

    const { appointments, message } = useSelector((state) => state.appt)
    const { room_number } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    useEffect(() => {
        const userData = {
            date
        }
        dispatch(getAppts(userData))
    }, [date, message, dispatch])

    async function onBook(machine, timeslot) {
        const userData = {
            date,
            timeslot,
            machine
        }
        let count = 0;
        if (timeslot > 12 || timeslot < 0 || machine < 0 || machine > 1) {
            return toast.error('Invalid appointment')
        }
        for (let id in appointments) {
            if (appointments[id]['room'] === room_number) {
                count++
            }
            if (count > 1) {
                return toast.error('Max 2 appointments a day')
            }
        }
        dispatch(bookAppt(userData))
        dispatch(getAppts(userData))
    }

    return (
        <div className='container text-center'>
            <DateSelector date={date} onDateChange={setDate} />
            <AppointmentsTable date={date} appts={appointments} machinesCount={machinesCount} onBook={onBook} />
        </div>
    )
}

function DateSelector({ date, onDateChange }) {
    return (
        <input className="mb-3" type="date" id="date" value={date} onChange={(e) => onDateChange(e.target.value)} />
    )
}

function AppointmentsTable({ date, appts, machinesCount, onBook }) {
    let rows = []
    let appt_data = new Array(12)
    for (let i = 0; i < 12; i++) {
        appt_data[i] = new Array(machinesCount)
    }

    for (let id in appts) {
        appt_data[appts[id].timeslot][appts[id].machine] = appts[id].room
    }

    for (let i = 0; i < 12; i++) {
        rows.push(
            <AppointmentsRow key={i} booked={appt_data[i]} timeslot={i} machinesCount={machinesCount} onBook={onBook} />
        )
    }

    let machines_header = []
    for (let i = 0; i < machinesCount; i++) {
        machines_header.push(
            <th key={i + 1}>Machine {i + 1}</th>
        )
    }
    return (
        <>
            <h1 className='mb-3'>{formatDate(date)}</h1>
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th key="0">Timeslot</th>
                        {machines_header}
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {rows}
                </tbody>
            </table>
        </>
    )
}

function AppointmentsRow({ booked, timeslot, machinesCount, onBook }) {
    let machines = []
    for (let i = 0; i < machinesCount; i++) {
        machines.push(
            <td key={i + 1}>
                {booked[i] ? booked[i] : <button data-timeslot={timeslot} data-machine={i} type="button" className="btn btn-outline-secondary py-0" onClick={(e) => { onBook(e.target.dataset.machine, e.target.dataset.timeslot) }}>book</button>}
            </td>
        )
    }
    return (
        <tr>
            <td key={0}>
                {formatTimeslot(timeslot)}
            </td>
            {machines}
        </tr>
    )
}

export function formatTimeslot(timeslot) {
    return String(timeslot * 2).padStart(2, '0') + ':00 - ' + String(timeslot * 2 + 2).padStart(2, '0') + ':00'
}

export function formatDate(date) {
    const new_date = date.split("-")
    return new_date[2] + '.' + new_date[1] + '.' + new_date[0]
}