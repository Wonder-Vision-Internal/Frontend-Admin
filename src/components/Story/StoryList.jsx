import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch } from 'react-redux'
import { deletestory, getAllHomeStay, getfilteredstories, gettestimonialstories } from '../../redux/Slice'




const StoryList = () => {

    const [stories, setStories] = useState()
    const [homestay, setHomeStay] = useState([{}])
    const [filter, setFilter] = useState({ slug: '' })
    const [hsname, setHsname] = useState('')

    const {post_type} = useParams()

  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gethomestaynames = async () => {
        const response = await dispatch(getAllHomeStay())
        console.log('home stay names', response.payload.details)
        setHomeStay(response.payload.details)
        return
    }

    useEffect(() => {
        gethomestaynames()
    }, [])

    const filterstories = async () => {
        if (filter.slug) {
            const response = await dispatch(getfilteredstories(filter.slug))
            setStories(response.payload.details[0].storyData)
            setHsname(response.payload.details[0].title)
            console.log('com', response.payload)
        }
        else {
            setStories('')
        }
    }

    useEffect(() => {
        filterstories()
    }, [filter])

    const testimonialStories = async()=>{
        const response = await dispatch(gettestimonialstories())
        console.log('test',response.payload);
        setStories(response.payload.storyData)
    }

   useEffect(()=>{
    if(post_type === 'testimonial'){
        testimonialStories()
        setHsname('')
    }
    else {
        setStories(null);
    }
   },[post_type])


    const handleChange = async (e) => {
        await setFilter({ [e.target.name]: e.target.value })
    }

    const handleDelete = async (storyid) => {
        const response = await dispatch(deletestory(storyid))
        console.log('response.payload', response.payload)
        if (response.payload.status == 1) {
            setTimeout(() => { window.location.reload(false) }, 1000)

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
                                {!post_type ? 
                                <div>
                                 {hsname && (
                                    <h1>Stories Of {hsname}</h1>
                                )} </div> : <h1>Stories Of Testimonial</h1>}
                               

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">Stories</li>
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
                                         {!post_type ? 
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
                                        : null}
                                        <div className='col-md-2'>
                                            {post_type ? <Link to='/stories/addstory/company_testimonial'>
                                                <button type="button" className="btn bg-gradient-primary"
                                                    style={{ marginLeft: '870px',width:'150px' }}>
                                                    <i className='fas fa-plus'></i>&nbsp;NEW STORY</button>
                                            </Link> : 
                                            <Link to='/stories/addstory'>
                                            <button type="button" className="btn bg-gradient-primary"
                                                style={{ marginLeft: '500px',width:'150px'}}>
                                                <i className='fas fa-plus'></i>&nbsp;NEW STORY</button>
                                        </Link>}
                                            
                                        </div>
                                    </div>
                                   
                                   

                                    <div className="card-body">
                                        {stories && (
                                            <table id="example1" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Sl. No.</th>
                                                        <th>User Image</th>
                                                        <th>Author</th>
                                                        <th>Content</th>
                                                        <th>Address</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stories.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><img
                                                                src={
                                                                    process.env.REACT_APP_BASE_IMG_URL +
                                                                    data.user_img
                                                                }
                                                                style={{ height: "150px", width: "200px" }}
                                                            /></td>
                                                            <td>{data.author}</td>
                                                            <td>{data.content}</td>
                                                            <td>{data.address}</td>
                                                            {post_type ? 
                                                            <td >
                                                                <Link to={`/stories/loadsinglestory/testimonial/${data._id}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <i className='fas fa-trash' onClick={() => handleDelete(data._id)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </td> : 
                                                             <td >
                                                             <Link to={`/stories/loadsinglestory/${data._id}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                             <i className='fas fa-trash' onClick={() => handleDelete(data._id)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                         </td>}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Sl. No.</th>
                                                        <th>User Image</th>
                                                        <th>Author</th>
                                                        <th>Content</th>
                                                        <th>Address</th>
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
export default StoryList


