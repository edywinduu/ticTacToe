import logo from './assets/favicon.gif';
import './Navbar.css';

export default function Navbar (){
    return (
        <div className="navigation-bar">
            <div className='navbar-content'>
                <img src={logo} alt="App Logo" className="app-logo"/>
                <h1>Edy</h1>
            </div>
        </div>
    )
}