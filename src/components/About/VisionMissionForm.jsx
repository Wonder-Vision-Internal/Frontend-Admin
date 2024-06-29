import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addhomestaypackagegallery, getAllHomeStay, getvisionmission, updatevisionmission } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const VisionMissionForm = () => {

    const [about, setAbout] = useState()
    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { title } = useParams()

    const fetchVisionMission = async () => {
        console.log(title);
        const response = await dispatch(getvisionmission(title))
        
        setAbout(response.payload.aboutData)
        return
    }

    useEffect(() => {
        fetchVisionMission()
    }, [title])


    const handleChange = (e) => {
        setAbout({...about,[e.target.name]: e.target.value })
    }

    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name) //for mongodb
        setPic(e.target.files[0])  //for storage
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        console.log('pic',pic);
        formData.append('title',title)
        formData.append('small_text', about.small_text)
        formData.append('featured_img', img)
        formData.append('pic', pic)
        const response = await dispatch(updatevisionmission({ formData }))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            if(title === 'Vision'){
                navigate(`/vision/${title}`)
            }
            else{
                navigate(`/mission/${title}`)
            }
            
        }
    }
    return (
        <div>
            <Layout />
            {/* <!-- Main content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {title === 'Vision' ? <h1><b>UPDATE VISION</b></h1>
                                    : <h1><b>UPDATE MISSION</b></h1>}

                            </div>
                            <div className="col-sm-6">
                                {title === 'Vision' ? <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to={`/vision/${title}`}>Vision</Link></li>
                                    <li className="breadcrumb-item active">Edit Vision</li>
                                </ol> :
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                        <li className="breadcrumb-item "><Link to={`/Mission/${title}`}>Mission</Link></li>
                                        <li className="breadcrumb-item active">Edit Mission</li>
                                    </ol>}

                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <!-- left column --> */}
                            <div className="col-md-12">
                                {/* <!-- jquery validation --> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        {
                                            title === 'Vision' ? <h3 className="card-title">Form To Edit Vision</h3>
                                                : <h3 className="card-title">Form To Edit Mission</h3>
                                        }

                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {about && 
                                     <form id="quickForm" onSubmit={handleSubmit}>
                                     <div className="card-body">
                                         <div className="form-group">
                                             <label htmlFor="exampleInputEmail1">Text</label>
                                             <textarea type="text" className="form-control"
                                                 placeholder="Enter Text"
                                                 name='small_text'
                                                 defaultValue={about.small_text}
                                                 onChange={handleChange}
                                             />
                                         </div>
                                         <div className='row'>
                                             <div className='col-md-6'>
                                                 <div className="form-group">
                                                     <label htmlFor="exampleInputEmail1">Picture</label>
                                                     <input type="file" className="form-control"
                                                         placeholder="Choose Picture"
                                                         name="img" onChange={handleImageUpload}/>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                     {/* <!-- /.card-body --> */}
                                     <div className="card-footer">
                                         <button type="submit" className="btn btn-primary">Submit</button>
                                     </div>
                                 </form>}
                                   
                                </div>
                                {/* <!-- /.card --> */}
                            </div>
                            {/* <!--/.col (left) --> */}

                            {/* <!--/.col (right) --> */}
                        </div>
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
            </div>
        </div>
    )
}



export default VisionMissionForm
