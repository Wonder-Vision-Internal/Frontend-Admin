import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import {  getintroduction, updateintroduction } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditIntroduction = () => {

    const [intro, setIntro] = useState()
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { postId } = useParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const handleError = (errors) => {};
    const fetchIntroduction = async () => {
        
        const response = await dispatch(getintroduction())
        
        setIntro(response.payload.homeData)
        return
    }

    useEffect(() => {
        fetchIntroduction()
    }, [])

    const formOptions = {
        small_text: {
        //   required: {
        //     value: true,
        //     message: "*Please Enter Title",
        //   },
        },
        video_link: {
            //   required: {
            //     value: true,
            //     message: "*Please Enter Title",
            //   },
            }
    }
  
    const handleForm = async (data,e) => {
        e.preventDefault()
        reset()
        let formData = new FormData()
        
        formData.append('postId',postId)
        formData.append('small_text', data.small_text ? data.small_text : intro.small_text)
        formData.append('video_link',data.video_link ? data.video_link : intro.video_link)
        
        
        const response = await dispatch(updateintroduction( formData ))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
                navigate(`/home/introduction`)  
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
                               <h1><b>UPDATE INTRODUCTION</b></h1>
                                    

                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to={`/home/introduction`}>Introduction</Link></li>
                                    <li className="breadcrumb-item active">Edit Introduction</li>
                                </ol> 

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
                                       <h3 className="card-title">Form To Edit Introduction</h3>
                                               
                                     

                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {intro && 
                                     <form id="quickForm"  onSubmit={handleSubmit(handleForm, handleError)}>
                                     <div className="card-body">
                                         <div className="form-group">
                                             <label htmlFor="exampleInputEmail1">Text</label>
                                             <textarea type="text" className="form-control"
                                                 placeholder="Enter Text"
                                                
                                                 defaultValue={intro.small_text}
                                                {...register('small_text',formOptions.small_text)}
                                             />
                                         </div>
                                         <div className='row'>
                                             <div className='col-md-6'>
                                                 <div className="form-group">
                                                     <label htmlFor="exampleInputEmail1">Video Link</label>
                                                     <input type="text" className="form-control"
                                                         placeholder="Enter Video Link"
                                                         defaultValue={intro.video_link} 
                                                        {...register('video_link',formOptions.video_link)}
                                                         />
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



export default EditIntroduction
