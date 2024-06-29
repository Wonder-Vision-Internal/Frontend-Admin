import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { adminLogin } from '../redux/Slice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    localStorage.clear()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {register,handleSubmit,reset,formState:{errors}} = useForm()

    const handleError = (errors)=>{}
    
        const registerOptions = {
            mail:{
                required:{
                    value:true,
                    message:'*Please Enter Email'
                }
            },
            password:{
                required:{
                    value:true,
                    message:'*Please Enter Password'
                }
            }
        }

        const handleForm = async (data,e)=>{
          e.preventDefault()
          const formData=new FormData()
          formData.append('mail',data.mail)
          formData.append('password',data.password)
          const response = await dispatch(adminLogin(formData))
          console.log('login',response);
          
          if(response.payload.status === 200){
            navigate(`/home`)
          }
        }

  return (
    <div className='hold-transition login-page' >
      <div className="login-box">
  {/* <!-- /.login-logo --> */}
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <b>Wonder Vision Admin Login</b>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Log in to check what's inside </p>

      <form onSubmit={handleSubmit(handleForm,handleError)}>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email"
          {...register('mail',registerOptions.mail)}/>
                          <p className='error'>{errors.mail?.message}</p>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password"
          {...register('password',registerOptions.password)}/>
                          <p className='error'>{errors.password?.message}</p>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            {/* <div className="icheck-primary">
              <input type="checkbox" id="remember"/>
              <label htmlFor="remember">
                Remember Me
              </label>
            </div> */}
          </div>
          {/* <!-- /.col --> */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
          </div>
          {/* <!-- /.col --> */}
        </div>
      </form>

    
    </div>
    {/* <!-- /.card-body --> */}
  </div>
  {/* <!-- /.card --> */}
</div>
{/* <!-- /.login-box --> */}
    </div> 
  )
}


export default Login
