import "../Styles/AboutUs.css";
import backTwo from "../assets/backTwo.jpg";

function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <img src={backTwo} alt="Open book" className="about-bg" />
        <div className="about-overlay" />
        <div className="about-content">
          <h1 className="about-title">
            BookBridge is a community-driven platform where readers can sell,
            borrow, and exchange books with each other. Our goal is to make
            reading more accessible and affordable by connecting people who love
            books. Whether you want to give your old books a new home, discover
            your next favorite read, or simply share knowledge, BookBridge is
            here to bridge the gap between readers.
          </h1>
          <p className="about-note">
            Have a question, feedback, or issue? We’d love to hear from you.
            Please reach out to us through <strong>+755 545 845</strong>. Our team
            will respond as soon as possible!
          </p>
        </div>
      </section>
    </main>
  );
}
export default AboutUs;
