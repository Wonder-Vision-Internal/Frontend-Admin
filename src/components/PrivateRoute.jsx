import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getsidebarmodules, verifytoken } from "../redux/Slice";
// import axios from 'axios'

import { ClipLoader } from "react-spinners";

const PrivateRoute = ({ Component }) => {
  // const {Component} = props
  const token = localStorage.getItem("adminToken");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = async () => {
    let path = await location.pathname.split("");
    let path1 = await path.slice(1).join("");

    // console.log('from private route', token);
    const formData = new FormData();
    formData.append("token", token);
    setIsLoading(true);
    const response = await dispatch(verifytoken(formData));
    // console.log('private route response', response);
    if (response.payload.status == 0 || response.payload.status == -1) {
      localStorage.clear();
      navigate("/");
      setIsLoading(false);
    } else {
      if (location.pathname === "/home") {
        setIsLoading(false);
      } else {
        let userType = await localStorage.getItem("userType");
        const formData = new FormData();
        formData.append("userType", userType);
        const response = await dispatch(getsidebarmodules(formData));
        let arr = await response.payload.sidemodules;
        console.log("arr", arr);

        for (let index = 0; index < arr.length; index++) {
          const x = arr[index];
          if (path1 === x.link) {
            setIsLoading(false);
            return;
          }
          if (x.access_item.length > 0) {
            let index = path1.indexOf('/')
            let path2 = path1.slice(0,index)
            for (let i = 0; i < x.access_item.length; i++) {
              console.log('path2',path1,x.access_item[i].root);
              if (path2 == x.access_item[i].root) {
                console.log('check');
                setIsLoading(false);
                return;
              }
            }
          }
          if (x.sub_module.length > 0) {
            for (let i = 0; i < x.sub_module.length; i++) {
              if (path1 === x.sub_module[i].sub_mod_link) {
                console.log("yes");
                setIsLoading(false);
                return;
              }
            }
          }
          if (arr.length == index + 1) {
            console.log("there");
            toastr.error("Permission Denied");
            navigate(-1);
          }
        }
      }
    }
  };
  useEffect(() => {
    logout();
  }, []);

  const getExpTime = localStorage.getItem("tokenExpTime");
  const currentTime = Date.now();
  const timeRemaining = getExpTime - currentTime;
  useEffect(() => {
    setTimeout(logout, timeRemaining);
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ position: "relative", top: "10%", left: "45%" }}>
          <p style={{ fontSize: 20, color: "#AE0000" }}>Loading...</p>
          <ClipLoader color={"#123abc"} loading={isLoading} size={100} />
        </div>
      ) : (
        <Component />
      )}
    </>
  );
};

export default PrivateRoute;
