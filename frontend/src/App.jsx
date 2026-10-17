import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Home from "./pages/Home.jsx";
import SpesificBook from "./pages/SpesificBook.jsx";
import BookCard from "./components/BookCard.jsx";
import Complaints from "./pages/Complaints.jsx";
import Profile from "./pages/Profile.jsx";
import AdminComplaints from "./pages/AdminComplaints.jsx";
import NewBook from "./pages/NewBook.jsx";
 
function App() {
  return (
    <BrowserRouter>
       <Navbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SpesificBook/:id" element={<SpesificBook />} />
        <Route path="/Complaints" element={<Complaints />} />
        <Route path="/NewBook" element={<NewBook />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AdminComplaints" element={<AdminComplaints />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}
export default App;
