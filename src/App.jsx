import { BrowserRouter as Router,Routes,Route, BrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import HomeStay from "./components/HomeStay/HomeStay"
import './style.css'
import HomeStayForm from "./components/HomeStay/HomeStayForm"
import EditHomeStay from "./components/HomeStay/EditHomeStay"
// import HomeStayFaq from "./components/HomeStay/HomeStayFaq"

import PackageForm from "./components/Packages/PackageForm"
// import PackageFaq from "./components/Packages/PackageFaq"
import PackageList from "./components/Packages/PackageList"
import PackageDetails from "./components/Packages/PackageDetails"
import PackageTab from "./components/Packages/PackageTab"
import StoryList from "./components/Story/StoryList"
import StoryForm from "./components/Story/StoryForm"
import EditStory from "./components/Story/EditStory"
import HomeStayDetails from "./components/HomeStay/HomeStayDetails"
import RoomsList from "./components/Rooms/RoomsList"
import RoomForm from "./components/Rooms/RoomForm"
import EditRoom from "./components/Rooms/EditRoom"
import Banner from "./components/Banners/Banner"
import HomeStayGallery from "./components/Gallery/HomeStayGallery"
import HomeStayGalleryForm from "./components/Gallery/HomeStayGalleryForm"
import EditHomeStayPackageGallery from "./components/Gallery/EditHomeStayPackageGallery"
import FounderList from "./components/Founder/FounderList"
import FounderForm from "./components/Founder/FounderForm"
import EditFounder from "./components/Founder/EditFounder"
import MainBannerForm from "./components/Banners/MainBannerForm"
import SubBannerForm from "./components/Banners/SubBannerForm"
import EditBanner from "./components/Banners/EditBanner"
import GaqList from "./components/GAQ/GaqList"
import GaqTabForm from "./components/GAQ/GaqTabForm"
import GaqForm from "./components/GAQ/GaqForm"
import EditGaq from "./components/GAQ/EditGaq"
import HomestayGaqList from "./components/GAQ/HomestayGaqList"
import HomestayGaqForm from "./components/GAQ/HomestayGaqForm"
import EdithomestayGaq from "./components/GAQ/EditHomestayGaq"
import BottomBanner from "./components/HomeStay/BottomBanner"
import BottomBannerForm from "./components/HomeStay/BottomBannerForm"
import PackageBottomBanner from "./components/Packages/PackageBottomBanner"
import PackageBottomBannerForm from "./components/Packages/PackageBottomBannerForm"
import PackageGallery from "./components/Gallery/PackageGallery"
import PackageGalleryForm from "./components/Gallery/PackageGalleryForm"
import CategoryImage from "./components/Packages/CategoryImage"
import CategoryImageForm from "./components/Packages/CategoryImageForm"
import EditPackage from "./components/Packages/EditPackage"
import AwardList from "./components/Awards/AwardList"
import AwardForm from "./components/Awards/AwardForm"
import TestimonialList from "./components/Testimonials/TestimonialList"
import TestimonialForm from "./components/Testimonials/TestimonialForm"
import BlogList from "./components/Blogs/BlogList"
import VisionMissionList from "./components/About/VisionMissionList"
import VisionMissionForm from "./components/About/VisionMissionForm"
import Introduction from "./components/Home/Introduction"
import EditIntroduction from "./components/Home/EditIntroduction"
import Tailormade from "./components/Tailormade/Tailormade"
import EditTailormade from "./components/Tailormade/EditTailormade"
import EditPackageTab from "./components/Packages/EditPackageTab"
import SpecialTour from "./components/Home/SpecialTour"
import EditSpecialTour from "./components/Home/EditSpecialTour"
import PrivateRoute from "./components/PrivateRoute"
import HomestayLogoRatingList from "./components/HomeStay/HomestayLogoRatingList"
import HomeStayLogoRatingForm from "./components/HomeStay/HomeStayLogoRatingForm"
import PackageLogoRatingList from "./components/Packages/PackageLogoRatingList"
import PackageLogoRatingForm from "./components/Packages/PackageLogoRatingForm"
import InclusionList from "./components/Packages/InclusionList"
import InclusionForm from "./components/Packages/InclusionForm"
import EditInclusion from "./components/Packages/EditInclusion"
import BlogForm from "./components/Blogs/BlogForm"
import TailormadeForm from "./components/Tailormade/TailormadeForm"
import EditBlog from "./components/Blogs/EditBlog"
import AllMeta from "./components/Meta/AllMeta"
import EditMeta from "./components/Meta/EditMeta"
import BookingQuery from "./components/CustomerInteraction/BookingQuery"
import Feedback from "./components/CustomerInteraction/Feedback"
import UserList from "./components/Users/UserList"
import Permission from "./components/Permissions/Permission"
import StaffsList from "./components/Staffs/StaffList"
import StaffForm from "./components/Staffs/StaffForm"
import EditStaff from "./components/Staffs/EditStaff"
import AddPriceDetails from "./components/Packages/AddPriceDetails"
import BookingList from "./components/Bookings/BookingList"
import BookingForm from "./components/Bookings/BookingForm"
import EditBooking from "./components/Bookings/EditBooking"
import PackageStoryList from "./components/Story/PackageStoryList"
import PackageStoryForm from "./components/Story/PackageStoryForm"
import EditPackageStory from "./components/Story/EditPackageStory"

import OtherHomestay from "./components/HomeStay/OtherHomestay"
import AddOtherHomestay from "./components/HomeStay/AddOtherHomestay"
import OtherPackage from "./components/HomeStay/OtherPackage"
import AddOtherPackage from "./components/HomeStay/AddOtherPackage"
import OtherHomestay_Package from "./components/Packages/OtherHomestay_Package"
import AddOtherHomestay_Package from "./components/Packages/AddOtherHomestay_Package"
import AddOtherPackage_Package from "./components/Packages/AddOtherPackage_Package"
import OtherPackage_Package from "./components/Packages/OtherPackage_Package"



function App() {
  

  return (
    <>
    <BrowserRouter basename= {process.env.REACT_APP_BASE_DIRECTORY} >
      <Routes>
        <Route path='/' element={<Login/>}/>

        <Route path='/permissions/:emp_id' element={<PrivateRoute Component={Permission}/>}/>

        <Route path='/stafflist' element={<PrivateRoute Component={StaffsList}/>}/>
        <Route path='/addstaff' element={<PrivateRoute Component={StaffForm}/>}/>
        <Route path='/editstaff/:emp_id' element={<PrivateRoute Component={EditStaff}/>}/>

        <Route path='/allmeta' element={<PrivateRoute Component={AllMeta}/>}/>
        <Route path='/editmeta/:page_name' element={<PrivateRoute Component={EditMeta}/>}/>

        <Route path='/allusers' element={<PrivateRoute Component={UserList}/>}/>

        <Route path='/bookingquery' element={<PrivateRoute Component={BookingQuery}/>}/>
        <Route path='/feedback' element={<PrivateRoute Component={Feedback}/>}/>

        <Route path='/bookings' element={<PrivateRoute Component={BookingList}/>}/>
        <Route path='/bookingform' element={<PrivateRoute Component={BookingForm}/>}/>
        <Route path='/editbooking/:id' element={<PrivateRoute Component={EditBooking}/>}/>
        
        <Route path='/home' element={<PrivateRoute Component={Home}/>}/>
        <Route path='/home/introduction' element={<PrivateRoute Component={Introduction}/>}/>
        <Route path='/home/loadintroduction/:postId' element={<PrivateRoute Component={EditIntroduction}/>}/>
        <Route path='/special-tour' element={<PrivateRoute Component={SpecialTour}/>}/>
        <Route path='/editspecialtour/:postId' element={<PrivateRoute Component={EditSpecialTour}/>}/>

        <Route path='/vision/:title' element={<PrivateRoute Component={VisionMissionList}/>}/>
        <Route path='/mission/:title' element={<PrivateRoute Component={VisionMissionList}/>}/>
        <Route path='/about/loadvisionmission/:title' element={<PrivateRoute Component={VisionMissionForm}/>}/>
        

        <Route path='/founderlist' element={<PrivateRoute Component={FounderList}/>}/>
        <Route path='/addfounder' element={<PrivateRoute Component={FounderForm}/>}/>
        <Route path='/founder/editfounder/:fid' element={<PrivateRoute Component={EditFounder}/>}/>

        <Route path='/tailormade' element={<PrivateRoute Component={Tailormade}/>}/>
        <Route path='/addtailormade/:type' element={<PrivateRoute Component={TailormadeForm}/>}/>
        <Route path='/tailormade/loadtailormade/:type/:postId' element={<PrivateRoute Component={EditTailormade}/>}/>

        <Route path='/awardlist' element={<PrivateRoute Component={AwardList}/>}/>
        <Route path='/awardform' element={<PrivateRoute Component={AwardForm}/>}/>
        <Route path='/awards/loadsingleAward/:awardId' element={<PrivateRoute Component={AwardForm}/>}/>
        <Route path='/loadawardtext/:postId' element={<PrivateRoute Component={AwardForm}/>}/>

        <Route path='/homestaylist' element={<PrivateRoute Component={HomeStay}/>}/>
        <Route path='/homestay/add' element={<PrivateRoute Component={HomeStayForm}/>}/>
        <Route path='/homestay/homestaydetails/:slug' element={<PrivateRoute Component={HomeStayDetails}/>}/>
        <Route path='/homestay/edithomestay/:slug' element={<PrivateRoute Component={EditHomeStay}/>}/>
        <Route path='/homestay/otherhomestays' element={<PrivateRoute Component={OtherHomestay}/>}/>
        <Route path='/homestay/addotherhomestay' element={<PrivateRoute Component={AddOtherHomestay}/>}/>
        <Route path='/homestay/otherpackages' element={<PrivateRoute Component={OtherPackage}/>}/>
        <Route path='/homestay/addotherpackage' element={<PrivateRoute Component={AddOtherPackage}/>}/>

        <Route path='/roomslist' element={<PrivateRoute Component={RoomsList}/>}/>
        <Route path='/rooms/addroom' element={<PrivateRoute Component={RoomForm}/>}/>
        <Route path='/rooms/loadsingleroom/:roomid' element={<PrivateRoute Component={EditRoom}/>}/>

        <Route path='/packages/loadcategoryimage/:catImageId' element={<PrivateRoute Component={CategoryImageForm}/>}/>
        <Route path='/packages/categoryimage' element={<PrivateRoute Component={CategoryImage}/>}/>
        <Route path='/packages' element={<PrivateRoute Component={PackageList}/>}/>
        <Route path='/packages/viewsinglepackage/:slug' element={<PrivateRoute Component={PackageDetails}/>}/>
        <Route path='/packages/addpackage' element={<PrivateRoute Component={PackageForm}/>}/>
        <Route path='/packages/addpackagetab/:slug' element={<PrivateRoute Component={PackageTab}/>}/>
        <Route path='/packages/addpackagetab' element={<PrivateRoute Component={PackageTab}/>}/>
        <Route path='/packages/loadsinglepackage/:slug' element={<PrivateRoute Component={EditPackage}/>}/>
        <Route path='/editpackagetab/:slug' element={<PrivateRoute Component={EditPackageTab}/>}/>
        <Route path='/packages/addpricedetails/:slug' element={<PrivateRoute Component={AddPriceDetails}/>}/>

        <Route path='/packageinclusionlist' element={<PrivateRoute Component={InclusionList}/>}/>
        <Route path='/packageinclusionform' element={<PrivateRoute Component={InclusionForm}/>}/>
        <Route path='/packages/editinclusion/:inclusionId' element={<PrivateRoute Component={EditInclusion}/>}/>
        <Route path='/package/otherhomestays' element={<PrivateRoute Component={OtherHomestay_Package}/>}/>
        <Route path='/package/addotherhomestay' element={<PrivateRoute Component={AddOtherHomestay_Package}/>}/>
        <Route path='/package/otherpackages' element={<PrivateRoute Component={OtherPackage_Package}/>}/>
        <Route path='/package/addotherpackage' element={<PrivateRoute Component={AddOtherPackage_Package}/>}/>

        <Route path='/banner/:page_name' element={<PrivateRoute Component={Banner}/>}/>
        <Route path='/banner/addbanner/:page_name' element={<PrivateRoute Component={MainBannerForm}/>}/>
        <Route path='/banner/addsub-banner/:page_name' element={<PrivateRoute Component={SubBannerForm}/>}/>
        <Route path='/banner/loadsinglebanner/:bannerid' element={<PrivateRoute Component={EditBanner}/>}/>

          <Route path='/homestaygallery' element={<PrivateRoute Component={HomeStayGallery}/>}/>
      <Route path='/gallery/homestaygalleryform' element={<PrivateRoute Component={HomeStayGalleryForm}/>}/>
        <Route path='/gallery/loadhomestaypackagegallery/:post_type/:galid' element={<PrivateRoute Component={EditHomeStayPackageGallery}/>}/>
        <Route path='/packagegallery' element={<PrivateRoute Component={PackageGallery}/>}/>
        <Route path='/gallery/packagegalleryform' element={<PrivateRoute Component={PackageGalleryForm}/>}/>
        

        <Route path='/gaqlist' element={<PrivateRoute Component={GaqList}/>}/>
        <Route path='/gaq/addgaqtab' element={<PrivateRoute Component={GaqTabForm}/>}/>
        <Route path='/gaq/addgaq' element={<PrivateRoute Component={GaqForm}/>}/>
        <Route path='/gaq/loadsinglegaq/:gaqid/:tab_index/:title_index' element={<PrivateRoute Component={EditGaq}/>}/>
        <Route path='/homestaygaqlist' element={<PrivateRoute Component={HomestayGaqList}/>}/>
        <Route path='/gaq/homestaygaqform' element={<PrivateRoute Component={HomestayGaqForm}/>}/>
        <Route path='/gaq/loadsinglehomestaygaq/:gaqid/:index' element={<PrivateRoute Component={EdithomestayGaq}/>}/>

        
        <Route path='/storieslist' element={<PrivateRoute Component={StoryList}/>}/>
        <Route path='/stories/loadsinglestory/:post_type/:storyid' element={<PrivateRoute Component={EditStory}/>}/>
        <Route path='/stories/loadsinglestory/:storyid' element={<PrivateRoute Component={EditStory}/>}/>
        <Route path='/stories/addstory/:post_type' element={<PrivateRoute Component={StoryForm}/>}/>
        <Route path='/stories/addstory' element={<PrivateRoute Component={StoryForm}/>}/>
        <Route path='/storieslist/:post_type' element={<PrivateRoute Component={StoryList}/>}/>

        <Route path='/packagestories' element={<PrivateRoute Component={PackageStoryList}/>}/>
        <Route path='/stories/packagestoryform' element={<PrivateRoute Component={PackageStoryForm}/>}/>
        <Route path='/stories/loadsinglepackagestory/:storyid' element={<PrivateRoute Component={EditPackageStory}/>}/>

        <Route path='/bottombannerhomestay' element={<PrivateRoute Component={BottomBanner}/>}/>
        <Route path='/bottombannerform' element={<PrivateRoute Component={BottomBannerForm}/>}/>
        <Route path='/bottombanner/loadsinglebanner/:bannerId' element={<PrivateRoute Component={BottomBannerForm}/>}/>
        <Route path='/bottombannerpackage' element={<PrivateRoute Component={PackageBottomBanner}/>}/>
        <Route path='/packagebottombannerform' element={<PrivateRoute Component={PackageBottomBannerForm}/>}/>
        <Route path='/packagebottombanner/loadsinglebanner/:bannerId' element={<PrivateRoute Component={PackageBottomBannerForm}/>}/>

        <Route path='/homestaylogoratinglist' element={<PrivateRoute Component={HomestayLogoRatingList}/>}/>
        <Route path='/homestay/addlogorating' element={<PrivateRoute Component={HomeStayLogoRatingForm}/>}/>
        <Route path='/homestay/editlogorating/:type/:slug/:logoratingId/:index' element={<PrivateRoute Component={HomeStayLogoRatingForm}/>}/>
        <Route path='/packagelogoratinglist' element={<PrivateRoute Component={PackageLogoRatingList}/>}/>
        <Route path='/packages/addlogorating' element={<PrivateRoute Component={PackageLogoRatingForm}/>}/>
        <Route path='/packages/editlogorating/:type/:slug/:logoratingId/:index' element={<PrivateRoute Component={PackageLogoRatingForm}/>}/>


        <Route path='/testimonial-list' element={<PrivateRoute Component={TestimonialList}/>}/>
        <Route path='/testimonialform' element={<PrivateRoute Component={TestimonialForm}/>}/>
        <Route path='/edit-testimonial/:postId' element={<PrivateRoute Component={TestimonialForm}/>}/>

        <Route path='/blog-list' element={<PrivateRoute Component={BlogList}/>}/>
        <Route path='/blogform' element={<PrivateRoute Component={BlogForm}/>}/>
        <Route path='/loadsingleblog/:blogId' element={<PrivateRoute Component={EditBlog}/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
