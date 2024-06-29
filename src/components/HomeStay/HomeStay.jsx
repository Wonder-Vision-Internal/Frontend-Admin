import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch } from 'react-redux'
import { deletehomestay, getAllHomeStay, hideunhidehomestay, markasotherhspackage } from '../../redux/Slice'




const HomeStay = () => {

  const [other,setOther] = useState()
  const [input, setInput] = useState([
    {
      title: '',
      content: '',
      price: '',
      featured_img: '',
      video_link: ''
    }
  ])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getHomeStayList = async () => {
    const response = await dispatch(getAllHomeStay())
    console.log('response', response.payload.details)
    setInput(response.payload.details)

    return
  }

  useEffect(() => {
    getHomeStayList()
  }, [])

  const handleAdd = () => {
    navigate('/homestay/add')
  }

  const handleClick = async(slug) => {
    // setOther(!other)
    const response = await dispatch(markasotherhspackage(slug))
  }

  const handleDelete = async (slug) => {
    const response = await dispatch(deletehomestay(slug))
    if (response.payload == 1) {
      setTimeout(() => { window.location.reload(false) }, 1000)
    }
  }

  const handleHide = async (slug) => {
    const response = await dispatch(hideunhidehomestay(slug))
    console.log('from hide', response);
    if (response.payload == 1 || response.payload == 2) {
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
                <h1>List of All Home Stays</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                  <li className="breadcrumb-item active">Home Stay List</li>
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
                  <div className="card-header">
                    <Button className='btn bg-gradient-primary addition' onClick={handleAdd}>ADD HOME STAY</Button>
                    <h3 className="card-title"></h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Name</th>
                          <th>Main Image</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Actions</th>

                          {/* <th>Is Featured</th>
                        */}
                        </tr>
                      </thead>
                      <tbody>
                        {input && input.map((data, index) => {
                          const { title, main_img, status, slug } = data
                          return (

                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{title}</td>

                              <td><img src={process.env.REACT_APP_BASE_IMG_URL + main_img}
                                style={{ height: '150px', width: '200px' }} /></td>
                              <td>{status == '1' ? 'Open' : 'Blocked'}</td>
                             <td>{data.priority}</td>
                              <td>
                                {/* <div class="icheck-primary d-inline ml-2">
                                  <input type="checkbox"  name="is_other" id="todoCheck1" 
                                  onClick={()=>handleClick(data.slug)}/>
                                  <label for="todoCheck1"></label>
                                </div>&nbsp;&nbsp;&nbsp;&nbsp; */}
                                <Link to={`/homestay/edithomestay/${data.slug}`}><i className='fas fa-pen fas'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* <i className='fas fa-trash' onClick={() => handleDelete(slug)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                <Link to={`/homestay/homestaydetails/${data.slug}`}><i className='fas fa-info'></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i className='fas fa-lock' onClick={() => handleHide(slug)}></i></td>

                            </tr>

                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Name</th>
                          <th>Main Image</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>
                    </table>
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
export default HomeStay


