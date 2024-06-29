import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch } from 'react-redux'
import { deleteroom, getAllHomeStay, getfilteredrooms, hideunhideroom } from '../../redux/Slice'




const RoomsList = () => {

    // const [stories, setStories] = useState(
    //     [{
    //     }])
    const [homestay, setHomeStay] = useState([{}])
    const [hsname,setHsname] = useState()
    const [filter, setFilter] = useState({ slug: '' })
    const [rooms, setRooms] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gethomestaynames = async () => {
        const response = await dispatch(getAllHomeStay())
        setHomeStay(response.payload.details)
        return
    }

    useEffect(() => {
        gethomestaynames()
    }, [])

    const filterrooms = async () => {
        if (filter.slug) {
            console.log(('filter.slug',filter.slug));
            const response = await dispatch(getfilteredrooms(filter.slug))
            setRooms(response.payload.details[0].roomsData)
            setHsname(response.payload.details[0].title)
        }
        else {
            setRooms('')
        }
    }

    useEffect(() => {
        filterrooms()
    }, [filter])

    const handleChange = async (e) => {
        await setFilter({ [e.target.name]: e.target.value })
    }

    const handleDelete = async (roomid) => {
        const response = await dispatch(deleteroom(roomid))
        console.log('response.payload', response.payload)
        if (response.payload.status == 1) {
            setTimeout(() => { window.location.reload(false) }, 1000)

        }
    }

    const handleHide = async(roomid)=>{
        console.log('room');
        const formData = new FormData()
        formData.append('roomid',roomid)
        const response = await dispatch(hideunhideroom(formData))
        console.log('from hide',response);
        if(response.payload == 1 || response.payload == 2){
          setTimeout(()=>{window.location.reload(false)},1000)       
        }
    }

    return (
        <div>
            <Layout />
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {hsname && (
                                    <h1>Rooms of {hsname}</h1>
                                )}

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">Rooms</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    {/* <div className="card-header"> */}
                                    {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                                    {/* <h3 className="card-title"></h3> */}
                                    {/* </div> */}
                                    {/* <!-- /.card-header --> */}
                                    <div className="row" style={{
                                        marginLeft: '20px',
                                        marginTop: '10px'
                                    }}>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Choose Home Stay</label>
                                                <select name='slug' onChange={handleChange}
                                                    className="form-control select2" style={{ width: '100%' }}>
                                                    <option value="">Select Home Stay</option>
                                                    {homestay && homestay.map((data, index) => (
                                                        <option value={data.slug} key={index}>{data.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div className='col-md-8 d-flex justify-content-end' >
                                            <Link to='/rooms/addroom' className='addition'>
                                                <button type="button" className="btn bg-gradient-primary"
                                                    >
                                                    <i className='fas fa-plus'></i>&nbsp;NEW ROOM</button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        {rooms && (
                                            <table id="example1" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                    <th>Sl. No.</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Image</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rooms.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.title}</td>
                                                            <td dangerouslySetInnerHTML={{__html:data.desc}}></td>
                                                            <td><img src={process.env.REACT_APP_BASE_IMG_URL + data.img}
                                                                style={{ height: '150px', width: '200px' }} /></td>
                                                                <td>{data.is_deleted == true ? 'Blocked' : 'Open'}</td>
                                                            <td style={{ width: '150px' }}>
                                                                <Link to={`/rooms/loadsingleroom/${data._id}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                {/* <i className='fas fa-trash' onClick={() => handleDelete(data._id)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                                                <i className='fas fa-lock'  onClick={()=>handleHide(data._id)}></i></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                    <th>Sl. No.</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Image</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
                                    </div>
                                    {/* <!-- /.card-body --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>

    )
}
export default RoomsList


