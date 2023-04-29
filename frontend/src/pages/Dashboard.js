import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const { username, room_number } = useSelector((state) => state.auth)

    // return (
    //     <div className='container'>
    //         <div class="row">
    //             <div class="col-sm-6 mb-3 mb-sm-0">
    //                 <div class="card">
    //                     <Link className="card-body">
    //                         <div class="card-body">
    //                             <h5 class="card-title">Special title treatment</h5>
    //                             <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    //                             <a href="#" class="btn btn-primary">Go somewhere</a>
    //                         </div>
    //                     </Link>
    //                 </div>
    //             </div>
    //             <div class="col-sm-6">
    //                 <div class="card">
    //                     <div class="card-body">
    //                         <h5 class="card-title">Special title treatment</h5>
    //                         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    //                         <a href="#" class="btn btn-primary">Go somewhere</a>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className='container'>
            <div className='text-center'>
                <h1>Hello, {username}!</h1>
                <p className='lead'>You room number is {room_number ? room_number : '(not moved in)'}</p>
                <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">

                        <div className="card panel">
                            <Link to="appts" className="panel-link">
                                <div className="card-body">
                                    <h5 className="card-title">Appointments</h5>
                                    <p className="card-text">Book an available washing appointment</p>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="card panel">
                            <Link to="myAppts" className="panel-link">
                                <div className="card-body">
                                    <h5 className="card-title">My Appointments</h5>
                                    <p className="card-text">Review or cancel your appointments</p>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card panel">
                            <Link to="devices" className="panel-link">
                                <div className="card-body">
                                    <h5 className="card-title">My Devices</h5>
                                    <p className="card-text">Review or delete you devices with internet access</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card panel">
                            <Link to="addDevice" className="panel-link">
                                <div className="card-body">
                                    <h5 className="card-title">Register Device</h5>
                                    <p className="card-text">Register a new device for the internet access</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}