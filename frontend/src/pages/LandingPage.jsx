import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/LandingPage.css";
import backOne from "../assets/backOne.avif";

function LandingPage() {
    return (
    <main className="landing">
    <section className="landing-hero" style={{ backgroundImage: `url(${backOne})` }}>  {/*dont forget this is called interpolation  */}
          <div className="landing-overlay" />
        <div className="landing-content">
          <h1 className="landing-title">
            Discover, Exchange,
            <br />and Share Books with
            <br />the Community.
          </h1>

          <p className="landing-sub">
            Join a platform where readers connect — sell, borrow, or trade your
            favorite books anytime.
          </p>

        <div className="landing-cta">
             <Link to="/Signup" className="btn btn-primary">Sign Up</Link>
             <Link to="/Login" className="btn btn-ghost">Log In</Link>
            </div>

          <div className="landing-links">
            <Link to="/AboutUs" className="chip">About us | Contact Us</Link>
           </div>
        </div>
       </section>
    </main>
  );
}
export default LandingPage;