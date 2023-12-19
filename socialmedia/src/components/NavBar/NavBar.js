import { Link } from 'react-router-dom';
import './style.css'
function Navbar(){

    return<>
    <div className="nav">
        <div className="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlv_U8NsCohtvbV3WqE-vj4waAzsr1YlfVg&usqp=CAU" alt="" />
            <h2>UnityStream</h2>
        </div>
        <div className="menu">
            <div className="menubar" id='signup'><Link to='/signup'>Signup</Link></div>
            <div className="menubar" id='login'><Link to=''  >Login</Link></div>
            <div className="menubar">Contact</div>
            <div className="menubar"><Link to='/'>Log Out</Link></div>
        </div>

    </div>

    
    </>
}
export default Navbar;