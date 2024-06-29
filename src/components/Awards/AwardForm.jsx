import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addawards, getallawards, updateaward } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const AwardForm = () => {

    const [text, setText] = useState()
    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { awardId } = useParams()
    const { postId } = useParams()



    console.log('psotid', postId);
    const getAwards = async () => {

        const response = await dispatch(getallawards())

        setText(response.payload.awardData[0])

        return
    }



    useEffect(() => {
        if (postId) {
            getAwards()
        }

    }, [])




    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }


    // const handleChange = (e)=>{
    //     setSlug({[e.target.name]:e.target.value})
    // }

    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name) //for mongodb
        setPic(e.target.files[0])  //for storage
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()

        const formData = new FormData()


        if (postId) {
            formData.append('small_text', input.small_text ? input.small_text : text.small_text)
            formData.append('postId', postId)
        }
        else {
            formData.append('awardId', awardId)

            formData.append('img', img)
            formData.append('pic', pic)
        }

        if (awardId || postId) {
            console.log('yes');
            const response = await dispatch(updateaward({ formData }))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/awardlist')
            }
        }
        else {
            const response = await dispatch(addawards({ formData }))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/awardlist')
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
                                {awardId ?
                                    <h1><b>AWARD PICTURE UPDATION FORM</b></h1> :
                                    postId ? <h1><b>AWARD NOTE EDITION FORM</b></h1>
                                        : <h1><b>AWARD PICTURE CREATION FORM</b></h1>}

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/awardlist'>Awards</Link></li>
                                    {awardId || postId ? <li className="breadcrumb-item active">Edit Award/Certificate</li>
                                        : <li className="breadcrumb-item active">Add Award/Certificate</li>}

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
                                        {awardId ?
                                            <h3 className="card-title">Form To Change Award Picture</h3> :
                                            postId ? <h3 className="card-title">Form To Update Award Text</h3> :
                                                <h3 className="card-title">Form To Upload New Award Picture</h3>}

                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}

                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        {
                                                            text ?
                                                                <div>
                                                                    <label htmlFor="exampleInputEmail1">Award Note</label>
                                                                    <textarea type="text" className="form-control"
                                                                        placeholder="Enter Text"
                                                                        defaultValue={text.small_text}
                                                                        {...register('small_text')}
                                                                    />
                                                                </div> : <div>
                                                                    <label htmlFor="exampleInputEmail1">Picture</label>
                                                                    <input type="file" className="form-control"
                                                                        placeholder="Enter Picture"
                                                                        name="img" onChange={handleImageUpload}

                                                                    /> </div>}

                                                        {/* <p className='error'>{errors.img?.message}</p> */}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        {/* <!-- /.card-body --> */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
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



export default AwardForm
