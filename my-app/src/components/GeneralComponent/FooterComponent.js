import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../../customStyles.css"
import lin from "../../images/icons8-linkedin-64.png";
import twi from "../../images/icons8-twitter-64.png";
import ins from "../../images/icons8-instagram-64.png";
function Footer() {
  return (
    <>
        <footer className="footer" >
            <div className="foot-flex">
                <div>
                    <h2>CyberAutos</h2>
                    <label>&#169; Copyright: 2023</label>
                    <br/>
                    <br/>
                    <div>
                        <a href="#"><img className="my-icons" src={lin} alt="not found"/></a>
                        <a href="#"><img className="my-icons" src={twi} alt="not found"/></a>
                        <a href="#"><img className="my-icons" src={ins} alt="not found"/></a>
                    </div>
                </div>
            </div>
        </footer>
    </>
  );
}

export default Footer;