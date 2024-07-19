import axios from 'axios'
import bcrypt from "bcryptjs-react";


const url = import.meta.env.VITE_BASE_API_URL

export const login = (input) => axios.post(`${url}/login`,input)
    .then((res) => {
        if (res.status == 200) {
            let user_type = res.data.user_type
            if(user_type == undefined){
                toastr.error('Permission Denied')
            }
            else{
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('points',res.data.points)
                localStorage.setItem('userType',bcrypt.hashSync(res.data.user_type,10))
                const tokenExpTime = Date.now() + 30 * 60 * 1000
                localStorage.setItem('tokenExpTime', tokenExpTime)
                toastr.success('Login Successful')
                return res
            }
        }

    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            if (err.response.data.status == 0) {
                toastr.warning(err.response.data.message)
                return res.data
            }
            else if (err.response.data.status == -1) {
                toastr.error(err.response.data.message)
                return res.data
            }
        }
        else {
            console.log('problem');
            toastr.error('Internal Error in Logging In')
        }
    })

//Private Route Verify Token

// export const verifyToken = (input) => axios.post(`${url}/verifytoken`,JSON.stringify(input))
export const verifyToken = (input) => axios.post(`${url}/verifytoken`,input)
    .then((res) => {
        // console.log('from about api', res)
        console.log('middleware called');
        if (res.status == 200) {
            // toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 403) {
            toastr.error(err.response.data.message)
            return err.response.data
        }
        else if (err.response.status == 400) {
            toastr.error(err.response.data.message)
            return err.response.data
        }
        else {
            toastr.error('Internal Error in Verifying Token')
        }
    })

//Permissions

export const getPermissionsById = (emp_id) => axios.get(`${url}/getpermissionsbyid/${emp_id}`)
    .then((res) => {
        console.log('from permission api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Meta Information')
        }
    })

    export const updatePermissions = (input) => axios.post(`${url}/updatepermissions`,input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Permissions')
        }
    })


//Get Sidebar modules

export const getSidebarModules = (userType) => axios.post(`${url}/getsidebarmodules`,userType)
    .then((res) => {
        console.log('from permission api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Navbar Modules')
        }
    })


//Staff
export const getAllStaffs = ( currentPage, itemsPerPage ) => axios.get(`${url}/getallstaffs/?pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
.then((res) => {
    console.log('from about api', res)
    if (res.status == 200) {
        return res.data
    }
}).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Fetching Staff Details')
    }
})

export const searchByEmpId = (emp_id) => axios.get(`${url}/searchbyempid/${emp_id}`)
.then((res) => {
    console.log('from about api', res)
    if (res.status == 200) {
        return res.data
    }
}).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Fetching Staff Details')
    }
})    


export const addStaff = (input) => axios.post(`${url}/addstaff`,input)
.then((res) => {
console.log('from about api', res)
if (res.status == 200) {
    toastr.success(res.data.message)
    return res.data
}
}).catch((err) => {
console.log('err', err)
if (err.response.status == 500) {
    toastr.error(err.response.data.message)
}
else if(err.response.status == 400){
    toastr.error(err.response.data.message)
}
else {
    toastr.error('Internal Error in Adding New Staff Member')
}
})

export const updateStaff = (input) => axios.post(`${url}/updatestaff`,input)
.then((res) => {
console.log('from about api', res)
if (res.status == 200) {
    toastr.success(res.data.message)
    return res.data
}
}).catch((err) => {
console.log('err', err)
if (err.response.status == 500) {
    toastr.error(err.response.data.message)
}
else {
    toastr.error('Internal Error in Updating Staff Member')
}
})



//Meta

export const getAllMeta = () => axios.get(`${url}/getallmeta`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Meta Information')
        }
    })

    export const updateMeta = (input) => axios.post(`${url}/updatemeta`,input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Meta Information')
        }
    })

//Registered Users

export const getAllUsers = (currentPage, itemsPerPage) => axios.get(`${url}/getallusers/?pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Users')
        }
    })

//Customer Interactions

export const getInteractions = (contact,currentPage, itemsPerPage) => axios.get(`${url}/getinteractions/?type=${contact}&pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Customer Interactions')
        }
    })

    //Bookings

    export const getAllBookings = (currentPage,itemsPerPage) => axios.get(`${url}/getallbookings/?pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Booking List')
        }
    })


export const searchBookings = (bookingId,bookingDate,bookingyear,bookingmonth,currentPage, itemsPerPage) => axios.get(`${url}/searchbookings/?bookingId=${bookingId}&bookingDate=${bookingDate}&bookingyear=${bookingyear}&bookingmonth=${bookingmonth}&pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
.then((res) => {
    console.log('from about api', res)
    if (res.data.status == 1) {
        return res.data
    }
    else if (res.data.status == 0) {
        toastr.warning(res.data.message)
    }
}).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Fetching Search Result')
    }
})

export const addBooking = (input) => axios.post(`${url}/addbooking`,input)
.then((res) => {
    console.log('from about api', res)
    if (res.status == 200) {
        toastr.success(res.data.message)
        return res.data
    }
 }).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Adding New Booking')
    }
})

export const loadSingleBooking = (id) => axios.get(`${url}/loadsinglebooking/${id}`)
.then((res) => {
    console.log('from loadbooking api', res)
    if (res.status == 200) {
        return res.data
    }
 }).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Loading Booking Details')
    }
})

export const updateBooking = (input) => axios.post(`${url}/updatebooking`,input)
.then((res) => {
    console.log('from cancel booking api', res)
    if (res.status == 200) {
        toastr.success(res.data.message)
        return res.data
    }
 }).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Updating Booking')
    }
})

export const cancelBooking = (id,currentPage, itemsPerPage) => axios.post(`${url}/cancelbooking/${id}/?pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}`)
.then((res) => {
    console.log('from cancel booking api', res)
    if (res.status == 200) {
        toastr.success(res.data.message)
        return res.data
    }
 }).catch((err) => {
    console.log('err', err)
    if (err.response.status == 500) {
        toastr.error(err.response.data.message)
    }
    else {
        toastr.error('Internal Error in Cancelling Booking')
    }
})


//Home

export const getIntroduction = () => axios.get(`${url}/getintroduction`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Introduction')
        }
    })

export const updateIntroduction = (input) => axios.post(`${url}/updateintroduction`, input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Introduction')
        }
    })
//special tour
export const getSpecialTour = () => axios.get(`${url}/special-tour-details`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Special Tour Details')
        }
    })

export const updateSpecialTour = (input) => axios.post(`${url}/updatespecialtour`, input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Special Tour')
        }
    })

//About

export const getVisionMission = (title) => axios.get(`${url}/getvisionmission/${title}`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching About Details')
        }
    })

export const updateVisionMission = ({ formData }) => axios.post(`${url}/updatevisionmission`, formData)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating About Details')
        }
    })
//Founders
export const getFounderList = (token) => axios.get(`${url}/getfounderlist`, {
    params: {
        token: token
    }
})
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            if (err.response.data.status === -2) {
                toastr.warning(err.response.data.message)
                return err.response.data
            }
            else if (err.response.data.status === 0) {
                toastr.error(err.response.data.message)
                return err.response.data
            }
        }
        else if (err.response.status == 400) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Founder Details')
        }
    })

export const addFounder = (input) => axios.post(`${url}/addfounder`, input)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Adding Member')
    })

export const loadSingleFounder = (fid) => axios.get(`${url}/getfounderbyid/${fid}`)
    .then((res) => {
        console.log('from founder api', res)
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const updateFounder = (input, fid) => axios.post(`${url}/updatefounder/${fid}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const deleteFounder = (fid) => axios.get(`${url}/deletefounder/${fid}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Deleting Member')
        }
        console.log('err', err)
    })

//Tailormade

export const getTailormade = () => axios.get(`${url}/get-tailormade`)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Tailormade Details')
        }
    })

    export const addTailormade = (input) => axios.post(`${url}/addtailormade`, input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Tailormade Item')
        }
    })

export const updateTailormade = (input) => axios.post(`${url}/updatetailormade`, input)
    .then((res) => {
        console.log('from about api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Tailormade Details')
        }
    })

//Awards

export const getAllAwards = () => axios.get(`${url}/getallawards`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Awards')
        }
        console.log('err', err)
    })

export const addAwards = ({ formData }) => axios.post(`${url}/addawards`, formData)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Award')
        }
        console.log('err', err)
    })

export const updateAward = ({ formData }) => axios.post(`${url}/updateaward`, formData)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Award')
        }
        console.log('err', err)
    })

export const deleteAward = (awardId) => axios.get(`${url}/deleteaward/${awardId}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Award')
        }
        console.log('err', err)
    })

//Homestays

export const AddHomeStay = (input) => axios.post(`${url}/addhomestay`, input)
    .then((res) => {
        console.log('from api', res.data)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
            return res.data.status
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const fetchAllHomeStay = () => axios.get(`${url}/getallhomestay`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })

export const getHomeStayBySlug = (slug) => axios.get(`${url}/gethomestaybyslug/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })

export const updateHomeStay = (input) => axios.post(`${url}/updatehomestay`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })


export const deleteHomeStay = (slug) => axios.post(`${url}/deletehomestay/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const hideUnhideHomeStay = (slug) => axios.post(`${url}/hideunhidehomestay/${slug}`)
    .then((res) => {
        console.log('from api res', res)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 2) {
            toastr.success(res.data.message)
            return res.data.status
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error(res.data.message)
    })


/* Routes for Rooms */

export const getFilteredRooms = (slug) => axios.get(`${url}/filterroombyslug/${slug}`)
    .then((res) => {
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const addRooms = (input, slug) => axios.post(`${url}/addroom/${slug}`, input)
    .then((res) => {
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
        }
        console.log('from api rooms', res.data)

    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const deleteRoom = (roomid) => axios.post(`${url}/deleteroom/${roomid}`)
    .then((res) => {
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const hideUnhideRoom = (roomid) => axios.post(`${url}/hideunhideroom`, roomid)
    .then((res) => {
        console.log('from api res', res)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 2) {
            toastr.success(res.data.message)
            return res.data.status
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error(res.data.message)
    })

export const getRoomById = (roomid) => axios.get(`${url}/getroombyid/${roomid}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })

export const updateRoom = (input, roomid) => axios.post(`${url}/updateroom/${roomid}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })
// Bottom Banner
export const getBottomBanner = (slug) => axios.get(`${url}/getbottombanner/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Filtering Bottom Banner')
    })

export const addBottomBanner = (input, slug) => axios.post(`${url}/addbottombanner/${slug}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.data.status == 0) {
            toastr.error(err.response.data.message)
        }
        else if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Package Tab')
        }
        console.log('err', err)
    })

export const updateBottomBanner = (input, bannerId) => axios.post(`${url}/updatebottombanner/${bannerId}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Bottom Banner')
        }
        console.log('err', err)
    })

export const deleteBottomBanner = (bannerId) => axios.get(`${url}/deletebottombanner/${bannerId}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Bottom Banner')
        }
        console.log('err', err)
    })

//package bottom banner
export const getPackageBottomBanner = (slug) => axios.get(`${url}/getpackagebottombanner/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Filtering Bottom Banner')
    })

export const addPackageBottomBanner = (input, slug) => axios.post(`${url}/addpackagebottombanner/${slug}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.data.status == 0) {
            toastr.error(err.response.data.message)
        }
        else if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Package Tab')
        }
        console.log('err', err)
    })

export const updatePackageBottomBanner = (input, bannerId) => axios.post(`${url}/updatebottombanner/${bannerId}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Bottom Banner')
        }
        console.log('err', err)
    })

export const deletePackageBottomBanner = (bannerId) => axios.get(`${url}/deletepackagebottombanner/${bannerId}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Bottom Banner')
        }
        console.log('err', err)
    })

//Logo & Rating

export const homeStayLogoRatingList = (slug) => axios.get(`${url}/homestaylogoratinglist/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Homestay Logo Rating List')
        }
        console.log('err', err)
    })

export const addHomePackageLogoRating = (input) => axios.post(`${url}/addhomepackagelogorating`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success('Homestay Logo Rating Document Added Successfully')
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            if (err.response.data.status == -1) {
                toastr.error(err.response.data.message)
            }
            else if (err.response.data.status == 0) {
                toastr.error(err.response.data.message)
            }
        }
        else {
            toastr.error('Internal Error in Adding Homestay Logo Rating')
        }
        console.log('err', err)
    })

export const updateHomestayLogoRating = (input) => axios.post(`${url}/updatehomestaylogorating`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success('Homestay Logo Rating Document Updated Successfully')
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Homestay Logo Rating')
        }
        console.log('err', err)
    })

    export const deleteLogoRating = (id,index) => axios.post(`${url}/deletelogorating/${id}/${index}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Homestay Logo Rating')
        }
        console.log('err', err)
    })

    export const otherHomestays = (slug) => axios.get(`${url}/otherhomestays/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Other Homestays')
        }
        console.log('err', err)
    })

    export const addOtherHomestay = (input) => axios.post(`${url}/addotherhomestay`,input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Other Homestay')
        }
        console.log('err', err)
    })    

    export const deleteOtherHomestay = (slug,index) => axios.post(`${url}/deleteotherhomestay/${slug}/${index}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Other Homestay')
        }
        console.log('err', err)
    })      

    export const otherPackages = (slug) => axios.get(`${url}/otherpackages/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Other Packages')
        }
        console.log('err', err)
    })

    export const addOtherPackage = (input) => axios.post(`${url}/addotherpackage`,input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Other Package')
        }
        console.log('err', err)
    })   

    export const deleteOtherPackage = (slug,index) => axios.get(`${url}/deleteotherpackage/${slug}/${index}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Other Package')
        }
        console.log('err', err)
    }) 

/* Routes for Packages */

export const markAsOtherHSPackage = (slug) => axios.post(`${url}/markasotherhspackage`, slug)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error To Set As Other Homestay/Package')
        }

    })

export const getCategoryImages = () => axios.get(`${url}/getcategoryimages`)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error(err.response.data.message)
    })


export const updateCategoryImage = (input, catImageId) => axios.post(`${url}/updatecategoryimage/${catImageId}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Category Image')
        }
        console.log('err', err)
    })


export const AddPackage = (formData) => axios.post(`${url}/addpackage`, formData)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        console.log('from api', res.data)
    }).catch((err) => {
        if (err.response.data.status === -1) {
            toastr.error(err.response.data.message)
        }
        else if (err.response.data.status === -2) {
            toastr.error(err.response.data.message)
        }
        else if (err.response.data.status === -3) {
            toastr.error(err.response.data.message)
        }
        else if (err.response.data.status === -4) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Creating Package')
        }
        console.log('err', err)
    })

export const AddPackageTab = (input) => axios.post(`${url}/addpackagetab`, input)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Package Tab')
        }
        console.log('err', err)
    })

    export const AddPriceDetails = (input) => axios.post(`${url}/addpricedetails`, input)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Package Tab')
        }
        console.log('err', err)
    })

    export const DeletePriceDetails = (input) => axios.post(`${url}/deletepricedetails`, input)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Package Tab')
        }
        console.log('err', err)
    })


export const updatePackage = (input) => axios.post(`${url}/updatepackage`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Package Details')
        }
        console.log('err', err)
    })

export const getTabNames = (slug) => axios.get(`${url}/get-tab-names/${slug}`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Tab Names')
        }
        console.log('err', err)
    })

export const updatePackageTab = (input) => axios.post(`${url}/updatepackagetab`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Package Tab Details')
        }
        console.log('err', err)
    })

    export const deletePackageTab = (input) => axios.post(`${url}/deletepackagetab`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Package Tab')
        }
        console.log('err', err)
    })

export const getAllPackages = () => axios.get(`${url}/getallpackages`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })
    export const getPriceDetails = (slug) => axios.get(`${url}/get-price-details/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })
export const getFilteredPackage = (package_category) => axios.get(`${url}/filterpackagebycategory/${package_category}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    })

export const getPackageBySlug = (slug) => axios.get(`${url}/getpackagebyslug/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
    })

export const hideUnhidePackage = (slug) => axios.post(`${url}/hideunhidepackage/${slug}`)
    .then((res) => {
        console.log('from api res', res)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 2) {
            toastr.success(res.data.message)
            return res.data.status
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error(res.data.message)
    })

export const deletePackage = (slug) => axios.post(`${url}/deletepackage/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const inclusionList = (slug) => axios.get(`${url}/inclusionlist/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.staus == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Inclusion List')
        }
    })

export const addInclusion = (input) => axios.post(`${url}/addinclusion`,input)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.staus == 500) {
            if(err.response.data.staus == 0){
                toastr.error(err.response.data.message)
            }
            else if(err.response.data.status == -1){
                toastr.error(err.response.data.message)
            }
        }
        else {
            toastr.error('Internal Error in Adding Inclusion Item')
        }
    })
    export const loadSingleInclusion = (inclusionId) => axios.get(`${url}/loadsingleinclusion/${inclusionId}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.staus == 500) {
                toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Inclusion Item')
        }
    })

    export const updateInclusion = (input) => axios.post(`${url}/updateinclusion`,input)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.staus == 500) {
            if(err.response.data.staus == 0){
                toastr.error(err.response.data.message)
            }
            else if(err.response.data.status == -1){
                toastr.error(err.response.data.message)
            }
        }
        else {
            toastr.error('Internal Error in Adding Inclusion Item')
        }
    })
    export const deleteInclusion = (inclusionId) => axios.get(`${url}/deleteinclusion/${inclusionId}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
                toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Inclusion Item')
        }
        console.log('err', err)
    })

/* Banners */
export const getBannerByPage = (page_name) => axios.get(`${url}/getbannerbypage/${page_name}`)
    .then((res) => {
        console.log('from api', page_name)
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const getHomeStayBanner = () => axios.get(`${url}/gethomestaybanner`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const getBlogsBanner = () => axios.get(`${url}/getblogsbanner`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Fetching Blogs Banner')
    })

export const addMainBanner = (input) => axios.post(`${url}/addmainbanner`, input)
    .then((res) => {
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
        }
        console.log('from api rooms', res.data)

    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })
export const addSubBanner = (input) => axios.post(`${url}/addsub-banner`, input)
    .then((res) => {
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
        }
        console.log('from api rooms', res.data)

    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const loadSingleBanner = (bannerid) => axios.get(`${url}/loadsinglebanner/${bannerid}`)
    .then((res) => {
        if (res.status == 200) {
            console.log('from api', res.data)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error('Unable To Fetch Banner Data')
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Fetching Single Banner')
    })

export const updateBanner = (input, bannerid) => axios.post(`${url}/updatebanner/${bannerid}`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Updating The Banner')
    })

export const deleteBanner = (bannerid) => axios.get(`${url}/deletebanner/${bannerid}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Deleting The Banner')
    })
//Routes for FAQ
export const getPackageFaq = (id) => axios.get(`${url}/getfaqbyid/${id}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    })

export const getGaqByPackage = (slug) => axios.get(`${url}/getgaqbypackage/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Fetching GAQs')
        }
        console.log('err', err)
    })

export const addGaqTab = (input) => axios.post(`${url}/addgaqtab`, input)
    .then((res) => {
        console.log('from add gaq tab api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Adding GAQ Tab')
        }
        console.log('err', err)
    })

export const addGaq = (input) => axios.post(`${url}/addgaq`, input)
    .then((res) => {
        console.log('from add gaq api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Adding GAQ')
        }
        console.log('err', err)
    })

export const loadSingleGaq = (gaqid, tab_index, title_index) => axios.get(`${url}/loadsinglegaq/${gaqid}/${tab_index}/${title_index}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Fetching Single GAQ')
        }
        console.log('err', err)
    })

export const updateGaq = (input) => axios.post(`${url}/updategaq`, input)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        console.log('from api', res.data)
    }).catch((err) => {
        if (err.response.data.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Updating GAQ')
        }
        console.log('err', err)
    })

export const deletePackageGaq = (gaqid, tab_index, title_index) => axios.post(`${url}/deletepackagegaq/${gaqid}/${tab_index}/${title_index}`)
    .then((res) => {
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        console.log('from api', res.data)
    }).catch((err) => {
        if (err.response.data.status == 500) {
            if (err.response.data.status == 0) {
                toastr.error(err.response.message)
            }
            else if (err.response.data.status == -1) {
                toastr.error(err.response.message)
            }
        }
        else {
            toastr.error('Internal Error in Deleting Package GAQ')
        }
        console.log('err', err)
    })


export const getGaqByHomestay = (slug) => axios.get(`${url}/getgaqbyhomestay/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.message)
        }
        else {
            toastr.error('Internal Error in Fetching Home Stay GAQs')
        }
        console.log('err', err)
    })

export const addHomestayGaq = (input) => axios.post(`${url}/addhomestaygaq`, input)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {

        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Home Stay GAQs')
        }
        console.log('err', err)
    })

export const loadSingleHomestayGaq = (gaqid, index) => axios.get(`${url}/loadsinglehomestaygaq/${gaqid}/${index}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Home Stay GAQs')
        }
        console.log('err', err)
    })

export const updateHomestayGaq = (input) => axios.post(`${url}/updatehomestaygaq`, input)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Home Stay GAQs')
        }
        console.log('err', err)
    })

export const deleteHomestayGaq = (gaqid, title) => axios.post(`${url}/deletehomestaygaq/${gaqid}/${title}`)
    .then((res) => {
        console.log('from api', res.data)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Home Stay GAQ')
        }
        console.log('err', err)
    })

/* Galleries */
export const getFilteredGallery = (slug) => axios.get(`${url}/filtergallerybyslug/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const addHomeStayPackageGallery = (input, slug) => axios.post(`${url}/addhomestaypackagegallery/${slug}`, input)
    .then((res) => {
        if (res.data.status == 1) {
            console.log('from api', res.data)
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.data.status == 0) {
            toastr.error(res.data.message)
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error In Creating Gallery Picture')
    })
export const loadSingleGallery = (galid) => axios.get(`${url}/loadsinglegallery/${galid}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }

    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const updateGallery = (input, galid) => axios.post(`${url}/updategallery/${galid}`, input)
    .then((res) => {
        console.log('fapi', input);
        console.log('from gallery api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }

    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Updating The Gallery')
    })

export const deleteGalleryPicture = (galid) => axios.get(`${url}/deletegallerypicture/${galid}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if(err.respnse.status == 500){
            toastr.error(err.response.data.message)
        }
        else{
            toastr.error('Internal Error in Deleting Gallery Picture')
        }
        
    })

/* Stories */
export const getFilteredStories = (slug) => axios.get(`${url}/filterstorybyslug/${slug}`)
    .then((res) => {
        console.log('from api', res.data)
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const getTestimonialStories = () => axios.get(`${url}/gettestimonialstories`)
    .then((res) => {
        if (res.status == 200) {
            return res.data
        }
        console.log('from api', res.data)

    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Testimonial Stories')
        }
    })

export const addStories = ({ formData }) => axios.post(`${url}/addstory`, formData)
    .then((res) => {
        console.log('from api', res.data)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 0) {
            toastr.success(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const loadSingleStory = (storyid) => axios.get(`${url}/loadsinglestory/${storyid}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

export const updateStory = ({ formData, storyid }) => axios.post(`${url}/updatestory/${storyid}`, formData)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Updating Story')
        }
    })



export const deleteStory = (storyid) => axios.get(`${url}/deletestory/${storyid}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })


    export const addPackageStories = ({ formData }) => axios.post(`${url}/addpackagestory`, formData)
    .then((res) => {
        console.log('from api', res.data)
        if (res.data.status == 1) {
            toastr.success(res.data.message)
            return res.data.status
        }
        else if (res.data.status == 0) {
            toastr.success(res.data.message)
        }
        return res.data
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error')
    })

// Testimonials

export const getAllTestimonials = () => axios.get(`${url}/testimonial-list`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Testimonials')
        }

    })

export const addTestimonial = (input) => axios.post(`${url}/addtestimonial`, input)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            if (err.response.data.status == 0) {
                toastr.error(err.response.data.message)
            }
            else if (err.response.data.status == -1) {
                toastr.error(err.response.data.message)
            }
        }
        else {
            toastr.error('Internal Error in Adding Testimonials')
        }

    })

export const updateTestimonial = (input) => axios.post(`${url}/updatetestimonial`, input)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
    })

export const deleteTestimonial = (testimonialId) => axios.get(`${url}/deletetestimonial/${testimonialId}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Fetching Testimonials')
        }

    })

//Blogs

export const getAllBlogs = () => axios.get(`${url}/getallblogs`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            return res.data
        }
        else if (res.status == 500) {
            toastr.error(res.data.message)
        }
    }).catch((err) => {
        console.log('err', err)
        toastr.error('Internal Error in Fetching Blog Names')
    })

    export const addBlog = (input) => axios.post(`${url}/addblog`,input)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Adding Blogs')
        }
    })

    export const loadSingleBlog = (blogId) => axios.get(`${url}/loadsingleblog/${blogId}`)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Loading Blog')
        }
    })

    export const updateBlog = (input) => axios.post(`${url}/updateblog`,input)
    .then((res) => {
        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Loading Blog')
        }
    })

export const deleteBlog = (blogId) => axios.get(`${url}/deleteblog/${blogId}`)
    .then((res) => {

        console.log('from api', res)
        if (res.status == 200) {
            toastr.success(res.data.message)
            return res.data
        }
    }).catch((err) => {
        console.log('err', err)
        if (err.response.status == 500) {
            toastr.error(err.response.data.message)
        }
        else {
            toastr.error('Internal Error in Deleting Blogs')
        }
    })