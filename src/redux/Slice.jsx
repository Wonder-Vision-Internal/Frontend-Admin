import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddHomeStay,
  AddPackage,
  AddPackageTab,
  AddPriceDetails,
  DeletePriceDetails,
  addAwards,
  addBlog,
  addBooking,
  addBottomBanner,
  addFounder,
  addGaq,
  addGaqTab,
  addHomePackageLogoRating,
  addHomeStayPackageGallery,
  addHomestayGaq,
  addInclusion,
  addMainBanner,
  addOtherHomestay,
  addOtherPackage,
  addPackageBottomBanner,
  addPackageStories,
  addRooms,
  addStaff,
  addStories,
  addSubBanner,
  addTailormade,
  addTestimonial,
  cancelBooking,
  deleteAward,
  deleteBanner,
  deleteBlog,
  deleteBottomBanner,
  deleteFounder,
  deleteGalleryPicture,
  deleteHomeStay,
  deleteHomestayGaq,
  deleteInclusion,
  deleteLogoRating,
  deleteOtherHomestay,
  deleteOtherPackage,
  deletePackage,
  deletePackageBottomBanner,
  deletePackageGaq,
  deletePackageTab,
  deleteRoom,
  deleteStory,
  deleteTestimonial,
  fetchAllHomeStay,
  getAllAwards,
  getAllBlogs,
  getAllBookings,
  getAllMeta,
  getAllPackages,
  getAllStaffs,
  getAllTestimonials,
  getAllUsers,
  getBannerByPage,
  getBlogsBanner,
  getBottomBanner,
  getCategoryImages,
  getFilteredGallery,
  getFilteredPackage,
  getFilteredRooms,
  getFilteredStories,
  getFounderList,
  getGaqByHomestay,
  getGaqByPackage,
  getHomeStayBanner,
  getHomeStayBySlug,
  getInteractions,
  getIntroduction,
  getPackageBottomBanner,
  getPackageBySlug,
  getPermissionsById,
  getPriceDetails,
  getRoomById,
  getSidebarModules,
  getSpecialTour,
  getTabNames,
  getTailormade,
  getTestimonialStories,
  getVisionMission,
  hideUnhideHomeStay,
  hideUnhidePackage,
  hideUnhideRoom,
  homeStayLogoRatingList,
  inclusionList,
  loadSingleBanner,
  loadSingleBlog,
  loadSingleBooking,
  loadSingleFounder,
  loadSingleGallery,
  loadSingleGaq,
  loadSingleHomestayGaq,
  loadSingleInclusion,
  loadSingleStory,
  login,
  markAsOtherHSPackage,
  otherHomestays,
  otherPackages,
  searchBookings,
  searchByEmpId,
  updateAward,
  updateBanner,
  updateBlog,
  updateBooking,
  updateBottomBanner,
  updateCategoryImage,
  updateFounder,
  updateGallery,
  updateGaq,
  updateHomeStay,
  updateHomestayGaq,
  updateHomestayLogoRating,
  updateInclusion,
  updateIntroduction,
  updateMeta,
  updatePackage,
  updatePackageTab,
  updatePermissions,
  updateRoom,
  updateSpecialTour,
  updateStaff,
  updateStory,
  updateTailormade,
  updateTestimonial,
  updateVisionMission,
  verifyToken,
  
} from "../Api";

export const adminLogin = createAsyncThunk(
  "/adminlogin",
  async (data) => {
    try {
      const response = await login(data);
      // console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const verifytoken = createAsyncThunk(
  "/verifytoken",
  async (input) => {
    try {
      const response = await verifyToken(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
      return error
    }
  }
);

//Permissions

export const getpermissionsbyid = createAsyncThunk(
  "/getpermissionsbyid",
  async (emp_id) => {
    try {
      const response = await getPermissionsById(emp_id);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);


export const updatepermissions = createAsyncThunk(
  "/updatepermissioins",
  async (input) => {
    try {
      const response = await updatePermissions(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

// Get Navbar Modules

export const getsidebarmodules = createAsyncThunk(
  "/getsidebarmodules",
  async (userType) => {
    try {
      const response = await getSidebarModules(userType);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Staff

export const getallstaffs = createAsyncThunk("/getallstaffs", 
async ({ currentPage, itemsPerPage }) => {
  try {
    const response = await getAllStaffs(currentPage, itemsPerPage );
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const searchbyempid = createAsyncThunk(
  "/searchbyempid",
  async (emp_id) => {
    try {
      const response = await searchByEmpId(emp_id);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addstaff = createAsyncThunk("/addstaff", async (input) => {
  try {
    const response = await addStaff(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const updatestaff = createAsyncThunk("/updatestaff", async (input) => {
  try {
    const response = await updateStaff(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});




//Meta

export const getallmeta = createAsyncThunk(
  "/getallmeta",
  async () => {
    try {
      const response = await getAllMeta();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatemeta = createAsyncThunk(
  "/updatemeta",
  async (input) => {
    try {
      const response = await updateMeta(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Registered Users

export const getallusers = createAsyncThunk(
  "/getallusers",
  async ({ currentPage, itemsPerPage }) => {
    try {
      const response = await getAllUsers(currentPage, itemsPerPage);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Customer Interactions

export const getinteractions = createAsyncThunk(
  "/getinteractions",
  async ({contact,currentPage, itemsPerPage}) => {
    try {
      const response = await getInteractions(contact,currentPage, itemsPerPage);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);


//Bookings

export const getallbookings = createAsyncThunk(
  "/getallbookings",
  async ({ currentPage, itemsPerPage }) => {
    try {
      const response = await getAllBookings(currentPage, itemsPerPage);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const searchbookings = createAsyncThunk(
  "/searchbybookings",
  async ({
    bookingId,
    bookingDate,
    bookingyear,
    bookingmonth,
    currentPage,
    itemsPerPage,
  }) => {
    try {
      console.log("new", bookingId, bookingDate);
      const response = await searchBookings(
        bookingId,
        bookingDate,
        bookingyear,
        bookingmonth,
        currentPage,
        itemsPerPage
      );
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addbooking = createAsyncThunk("/addbooking", async (input) => {
  try {
    const response = await addBooking(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const loadsinglebooking = createAsyncThunk(
  "/loadsinglebooking",
  async (id) => {
    try {
      console.log("booking called", id);
      const response = await loadSingleBooking(id);
      console.log("from booking slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatebooking = createAsyncThunk(
  "/updatebooking",
  async (input) => {
    try {
      const response = await updateBooking(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const cancelbooking = createAsyncThunk(
  "/cancelbooking",
  async ({ id, currentPage, itemsPerPage }) => {
    try {
      const response = await cancelBooking(id, currentPage, itemsPerPage);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Home

export const getintroduction = createAsyncThunk(
  "/getintroduction",
  async () => {
    try {
      const response = await getIntroduction();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updateintroduction = createAsyncThunk(
  "/updateintroduction",
  async (input) => {
    try {
      const response = await updateIntroduction(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//special tour

export const getspecialtour = createAsyncThunk(
  "/getspecialtour",
  async () => {
    try {
      const response = await getSpecialTour();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatespecialtour = createAsyncThunk(
  "/updatespecialtour",
  async (input) => {
    try {
      const response = await updateSpecialTour(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);


//About

export const getvisionmission = createAsyncThunk(
  "/getvisionmission",
  async (title) => {
    try {
      const response = await getVisionMission(title);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatevisionmission = createAsyncThunk(
  "/updatevisionmission",
  async ({ formData }) => {
    try {
      const response = await updateVisionMission({ formData });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Founders
export const getfounderlist = createAsyncThunk(
  "/getfounderlist",
  async (token) => {
    try {
      const response = await getFounderList(token);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addfounder = createAsyncThunk("/addfounder", async (formData) => {
  try {
    const response = await addFounder(formData);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const loadsinglefounder = createAsyncThunk(
  "/loadsinglefounder",
  async (fid) => {
    try {
      console.log("load founder", fid);
      const response = await loadSingleFounder(fid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatefounder = createAsyncThunk(
  "/updatefounder",
  async ({ formData, fid }) => {
    try {
      const response = await updateFounder(formData, fid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletefounder = createAsyncThunk("/deletefounder", async (fid) => {
  try {
    const response = await deleteFounder(fid);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

//Tailormade

export const get_tailormade = createAsyncThunk(
  "/get_tailormade", 
async () => {
  try {
    const response = await getTailormade();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addtailormade = createAsyncThunk(
  "/addtailormade", async (input) => {
  try {
    const response = await addTailormade(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const updatetailormade = createAsyncThunk(
  "/updatetailormade", async (input) => {
  try {
    const response = await updateTailormade(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

//Awards

export const getallawards = createAsyncThunk("/getallawards", async () => {
  try {
    const response = await getAllAwards();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addawards = createAsyncThunk(
  "/addawards",
  async ({ formData }) => {
    try {
      const response = await addAwards({ formData });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updateaward = createAsyncThunk(
  "/updateaward",
  async ({ formData }) => {
    try {
      const response = await updateAward({ formData });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const deleteaward = createAsyncThunk("/deleteaward", async (awardId) => {
  try {
    const response = await deleteAward(awardId);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

//Homestays
export const addhomestay = createAsyncThunk("/addhomestay", async (input) => {
  try {
    const response = await AddHomeStay(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const getAllHomeStay = createAsyncThunk("/getallhomestay", async () => {
  try {
    const response = await fetchAllHomeStay();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const gethomestaybyslug = createAsyncThunk(
  "/loadsinglehomestay",
  async (slug) => {
    try {
      const response = await getHomeStayBySlug(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatehomestay = createAsyncThunk(
  "/updatehomestay",
  async (formData) => {
    try {
      console.log("hello from slice");
      const response = await updateHomeStay(formData);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletehomestay = createAsyncThunk(
  "/deletehomestay",
  async (slug) => {
    try {
      const response = await deleteHomeStay(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const hideunhidehomestay = createAsyncThunk(
  "/hideunhidehomestay",
  async (slug) => {
    try {
      const response = await hideUnhideHomeStay(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getfilteredrooms = createAsyncThunk(
  "/getfilteredrooms",
  async (slug) => {
    try {
      console.log("slug", slug);
      const response = await getFilteredRooms(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addrooms = createAsyncThunk(
  "/addrooms",
  async ({ formData, slug }) => {
    try {
      console.log("slug", slug);
      const response = await addRooms(formData, slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deleteroom = createAsyncThunk("/deleteroom", async (roomid) => {
  try {
    const response = await deleteRoom(roomid);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const hideunhideroom = createAsyncThunk(
  "/hideunhideroom",
  async (roomid) => {
    try {
      const response = await hideUnhideRoom(roomid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getroombyid = createAsyncThunk("/getroombyid", async (roomid) => {
  try {
    const response = await getRoomById(roomid);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const updateroom = createAsyncThunk(
  "/updateroom",
  async ({ formData, roomid }) => {
    try {
      const response = await updateRoom(formData, roomid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Bottom Banner

export const getbottombanner = createAsyncThunk(
  "/getbottombanner",
  async (slug) => {
    try {
      const response = await getBottomBanner(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addbottombanner = createAsyncThunk(
  "/addbottombanner",
  async ({ formData, slug }) => {
    try {
      const response = await addBottomBanner(formData, slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const updatebottombanner = createAsyncThunk(
  "/updatebottombanner",
  async ({ formData, bannerId }) => {
    try {
      const response = await updateBottomBanner(formData, bannerId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletebottombanner = createAsyncThunk(
  "/deletebottombanner",
  async (bannerId) => {
    try {
      const response = await deleteBottomBanner(bannerId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getpackagebottombanner = createAsyncThunk(
  "/getpackagebottombanner",
  async (slug) => {
    try {
      const response = await getPackageBottomBanner(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addpackagebottombanner = createAsyncThunk(
  "/addpackagebottombanner",
  async ({ formData, slug }) => {
    try {
      const response = await addPackageBottomBanner(formData, slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const updatepackagebottombanner = createAsyncThunk(
  "/updatepackagebottombanner",
  async ({ formData, bannerId }) => {
    try {
      const response = await updateBottomBanner(formData, bannerId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletepackagebottombanner = createAsyncThunk(
  "/deletepackagebottombanner",
  async (bannerId) => {
    try {
      const response = await deletePackageBottomBanner(bannerId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Homestay Logo Rating

export const homestaylogoratinglist = createAsyncThunk(
  "/homestaylogoratinglist",
  async (slug) => {
    try {
      const response = await homeStayLogoRatingList(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addhomepackagelogorating = createAsyncThunk(
  "/addhomestaylogorating",
  async (input) => {
    try {
      const response = await addHomePackageLogoRating(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatehomestaylogorating = createAsyncThunk(
  "/updatehomestaylogorating",
  async (input) => {
    try {
      const response = await updateHomestayLogoRating(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletelogorating = createAsyncThunk(
  "/deletelogorating",
  async ({id,index}) => {
    try {
      const response = await deleteLogoRating(id,index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const otherhomestays = createAsyncThunk(
  "/otherhomestays",
  async (slug) => {
    try {
      const response = await otherHomestays(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addotherhomestay = createAsyncThunk(
  "/addotherhomestay",
  async (input) => {
    try {
      const response = await addOtherHomestay(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deleteotherhomestay = createAsyncThunk(
  "/deleteotherhomestay",
  async ({slug,index}) => {
    try {
      const response = await deleteOtherHomestay(slug,index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const otherpackages = createAsyncThunk(
  "/otherpackages",
  async (slug) => {
    try {
      const response = await otherPackages(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addotherpackage = createAsyncThunk(
  "/addotherpackage",
  async (input) => {
    try {
      const response = await addOtherPackage(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deleteotherpackage = createAsyncThunk(
  "/deleteotherpackage",
  async ({slug,index}) => {
    try {
      const response = await deleteOtherPackage(slug,index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Package

export const markasotherhspackage = createAsyncThunk(
  "/markasotherhspackage",
  async (slug) => {
    try {
      const response = await markAsOtherHSPackage(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getcategoryimages = createAsyncThunk(
  "/getcategoryimages",
  async () => {
    try {
      const response = await getCategoryImages();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatecategoryimage = createAsyncThunk(
  "/updatecategoryimage",
  async ({ formData, catImageId }) => {
    try {
      const response = await updateCategoryImage(formData, catImageId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addpackage = createAsyncThunk("/addpackage", async (input) => {
  try {
    console.log("hello");
    const response = await AddPackage(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addpackagetab = createAsyncThunk(
  "/addpackagetab",
  async ( input ) => {
    try {
      const response = await AddPackageTab(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addpricedetails = createAsyncThunk(
  "/addpricedetails",
  async ( input ) => {
    try {
      const response = await AddPriceDetails(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletepricedetails = createAsyncThunk(
  "/deletepricedetails",
  async ( input ) => {
    try {
      const response = await DeletePriceDetails(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatepackage = createAsyncThunk(
  "/updatepackage",
  async (input) => {
    try {
      const response = await updatePackage(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const get_tab_names = createAsyncThunk(
  "/gettabnames",
  async (slug) => {
    try {
      const response = await getTabNames(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatepackagetab = createAsyncThunk(
  "/updatepackagetab",
  async (input) => {
    try {
      const response = await updatePackageTab(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletepackagetab = createAsyncThunk(
  "/deletepackagetab",
  async (input) => {
    try {
      const response = await deletePackageTab(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const AllPackages = createAsyncThunk("/allpackages", async () => {
  try {
    const response = await getAllPackages();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const getpricedetails = createAsyncThunk("/pricedetails", async ({slug}) => {
  try {
    const response = await getPriceDetails(slug);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const FilteredPackages = createAsyncThunk(
  "/filteredpackages",
  async (package_category) => {
    try {
      console.log("filter", package_category);
      const response = await getFilteredPackage(package_category);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const PackageBySlug = createAsyncThunk(
  "/packagebyslug",
  async (slug) => {
    try {
      const response = await getPackageBySlug(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const hideunhidepackage = createAsyncThunk(
  "/hideunhidepackage",
  async (slug) => {
    try {
      const response = await hideUnhidePackage(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletepackage = createAsyncThunk(
  "/deletepackage",
  async (slug) => {
    try {
      const response = await deletePackage(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const inclusionlist = createAsyncThunk(
  "/inclusionlist",
  async (slug) => {
    try {
      const response = await inclusionList(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addinclusion = createAsyncThunk(
  "/addinclusion",
  async (input) => {
    try {
      const response = await addInclusion(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);


export const loadsingleinclusion = createAsyncThunk(
  "/loadsingleinclusion",
  async (inclusionId) => {
    try {
      const response = await loadSingleInclusion(inclusionId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updateinclusion = createAsyncThunk(
  "/updateinclusion",
  async (input) => {
    try {
      const response = await updateInclusion(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deleteinclusion = createAsyncThunk(
  "/deleteinclusion",
  async (inclusionId) => {
    try {
      const response = await deleteInclusion(inclusionId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Banner

export const getbannerbypage = createAsyncThunk(
  "/bannerbypage",
  async (page_name) => {
    try {
      console.log("page name form slice", page_name);
      const response = await getBannerByPage(page_name);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const gethomestaybanner = createAsyncThunk(
  "/homestaybanner",
  async () => {
    try {
      const response = await getHomeStayBanner();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getblogsbanner = createAsyncThunk("/getblogsbanner", async () => {
  try {
    const response = await getBlogsBanner();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addmainbanner = createAsyncThunk(
  "/addmainbanner",
  async ({ formData }) => {
    try {
      const response = await addMainBanner(formData);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addsubbanner = createAsyncThunk(
  "/addmainbanner",
  async (formData) => {
    try {
      const response = await addSubBanner(formData);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const loadsinglebanner = createAsyncThunk(
  "/loadsinglebanner",
  async (bannerid) => {
    try {
      console.log("bannerid", bannerid);
      const response = await loadSingleBanner(bannerid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatebanner = createAsyncThunk(
  "/updatebanner",
  async ({ formData, bannerid }) => {
    try {
      const response = await updateBanner(formData, bannerid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletebanner = createAsyncThunk(
  "/deletebanner",
  async (bannerid) => {
    try {
      const response = await deleteBanner(bannerid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

// Galleries

export const getfilteredgallery = createAsyncThunk(
  "/getfilteredgallery",
  async (slug) => {
    try {
      console.log("slug", slug);
      const response = await getFilteredGallery(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addhomestaypackagegallery = createAsyncThunk(
  "/addhomestaygallery",
  async ({ formData, slug }) => {
    try {
      console.log("slug", slug);
      const response = await addHomeStayPackageGallery(formData, slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const loadsinglegallery = createAsyncThunk(
  "/loadsinglegallery",
  async (galid) => {
    try {
      console.log("galid from slice", galid);
      const response = await loadSingleGallery(galid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updategallery = createAsyncThunk(
  "/updategallery",
  async ({ formData, galid }) => {
    try {
      const response = await updateGallery(formData, galid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletegallerypicture = createAsyncThunk(
  "/deletegallerypicture",
  async (galid) => {
    try {
      console.log('galid',galid);
      const response = await deleteGalleryPicture(galid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
// GAQ
export const getgaqbypackage = createAsyncThunk(
  "/getgaqbypackage",
  async (slug) => {
    try {
      console.log("from slice id", slug);
      const response = await getGaqByPackage(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addgaqtab = createAsyncThunk("/addgaqtab", async ( input ) => {
  try {
    const response = await addGaqTab(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addgaq = createAsyncThunk("/addgaq", async (input) => {
  try {
    const response = await addGaq(input);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const loadsinglegaq = createAsyncThunk(
  "/loadsinglegaq",
  async ({ gaqid, tab_index, title_index }) => {
    try {
      console.log('hello');
      const response = await loadSingleGaq(gaqid, tab_index, title_index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updategaq = createAsyncThunk(
  "/updategaq",
  async (input) => {
    try {
      const response = await updateGaq(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletepackagegaq = createAsyncThunk(
  "/deletepackagegaq",
  async ({gaqid,tab_index,title_index}) => {
    try {
      const response = await deletePackageGaq(gaqid,tab_index,title_index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);


export const getgaqbyhomestay = createAsyncThunk(
  "/getgaqbyhomestay",
  async (slug) => {
    try {
      const response = await getGaqByHomestay(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addhomestaygaq = createAsyncThunk(
  "/addhomestaygaq",
  async (input) => {
    try {
      const response = await addHomestayGaq(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const loadsinglehomestaygaq = createAsyncThunk(
  "/getsinglehomestaygaq",
  async ({ gaqid, index }) => {
    try {
      const response = await loadSingleHomestayGaq(gaqid, index);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatehomestaygaq = createAsyncThunk(
  "/updatehomestaygaq",
  async (input) => {
    try {
      const response = await updateHomestayGaq(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletehomestaygaq = createAsyncThunk(
  "/deletehomestaygaq",
  async ({ gaqid, title }) => {
    try {
      const response = await deleteHomestayGaq(gaqid, title);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

//Stories

export const getfilteredstories = createAsyncThunk(
  "/getfilteredstories",
  async (slug) => {
    try {
      console.log("slug", slug);
      const response = await getFilteredStories(slug);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const gettestimonialstories = createAsyncThunk(
  "/gettestimonialstories",
  async () => {
    try {
      const response = await getTestimonialStories();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const addstories = createAsyncThunk(
  "/addstories",
  async ({ formData }) => {
    try {
      const response = await addStories({ formData });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const loadsinglestory = createAsyncThunk(
  "/loadsinglestory",
  async (storyid) => {
    try {
      console.log("from slice", storyid);
      const response = await loadSingleStory(storyid);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updatestory = createAsyncThunk(
  "/updatestory",
  async ({ formData, storyid }) => {
    try {
      const response = await updateStory({ formData, storyid });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const editstory = createAsyncThunk("/deletestory", async (storyid) => {
  try {
    const response = await editStory(storyid);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const deletestory = createAsyncThunk("/deletestory", async (storyid) => {
  try {
    const response = await deleteStory(storyid);
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addpackagestories = createAsyncThunk(
  "/addstories",
  async ({ formData }) => {
    try {
      const response = await addPackageStories({ formData });
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const getalltestimonials = createAsyncThunk(
  "/getalltestimonials",
  async () => {
    try {
      const response = await getAllTestimonials();
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const addtestimonial = createAsyncThunk(
  "/addtestimonial",
  async (input) => {
    try {
      // console.log('input from slice',input);
      const response = await addTestimonial(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const update_testimonial = createAsyncThunk(
  "/updatetestimonial",
  async (input) => {
    try {
      // console.log('input from slice',input);
      const response = await updateTestimonial(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deletetestimonial = createAsyncThunk(
  "/deletetestimonial",
  async (testimonialId) => {
    try {
      // console.log('input from slice',input);
      const response = await deleteTestimonial(testimonialId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
export const getallblogs = createAsyncThunk("/getallblogs", async () => {
  try {
    const response = await getAllBlogs();
    console.log("from slice", response);
    return response;
  } catch (error) {
    console.log("error from slice", error.message);
  }
});

export const addblog = createAsyncThunk(
  "/addblog",
  async (input) => {
    try {
      // console.log('input from slice',input);
      const response = await addBlog(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const loadsingleblog = createAsyncThunk(
  "/loadsingleblog",
  async (blogId) => {
    try {
      // console.log('input from slice',input);
      const response = await loadSingleBlog(blogId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const updateblog = createAsyncThunk(
  "/updateblog",
  async (input) => {
    try {
      // console.log('input from slice',input);
      const response = await updateBlog(input);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);

export const deleteteblog = createAsyncThunk(
  "/deleteteblog",
  async (blogId) => {
    try {
      // console.log('input from slice',input);
      const response = await deleteBlog(blogId);
      console.log("from slice", response);
      return response;
    } catch (error) {
      console.log("error from slice", error.message);
    }
  }
);
const adminSlice = createSlice({
  name: "wonderadmin",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
});
export const adminReducer = adminSlice.reducer;
