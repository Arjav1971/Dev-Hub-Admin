
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customer';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import Couponlist from './pages/Couponlist';
import Addcoupon from './pages/Addcoupon';
import ViewEnq from './pages/ViewEnq';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/reset-password" element={<Resetpassword/>}/>
      <Route path="/forgot-password" element={<Forgotpassword/>}/>
      <Route path="/admin" element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="enquiries" element={<Enquiries/>}/>
        <Route path="enquiries/:id" element={<ViewEnq/>}/>

        <Route path="blog-list" element={<Bloglist/>}/>
        <Route path="blog" element={<Addblog/>}/>
        <Route path="blog/:id" element={<Addblog/>}/>

        <Route path="coupon" element={<Addcoupon/>}/>
        <Route path="coupon/:id" element={<Addcoupon/>}/>

        <Route path="coupon-list" element={<Couponlist/>}/>
        <Route path="blog-category-list" element={<Blogcatlist/>}/>
        <Route path="blog-category" element={<Addblogcat/>}/>
        <Route path="blog-category/:id" element={<Addblogcat/>}/>

        <Route path="orders" element={<Orders/>}/>
        <Route path="customers" element={<Customers/>}/>
        <Route path="list-color" element={<Colorlist/>}/>
        <Route path="color" element={<Addcolor/>}/>
        <Route path="color/:id" element={<Addcolor/>}/>
        <Route path="list-category" element={<Categorylist/>}/>
        <Route path="category" element={<Addcat/>}/>
        <Route path="category/:id" element={<Addcat/>}/>
        <Route path="list-brand" element={<Brandlist/>}/>
        <Route path="brand" element={<Addbrand/>}/>
        <Route path="brand/:id" element={<Addbrand/>}/>
        <Route path="product-list" element={<Productlist/>}/>
        <Route path="product" element={<Addproduct/>}/>
      </Route> 

    </Routes>
  </Router>;
}

export default App;
