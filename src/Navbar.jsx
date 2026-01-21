import logo from './assets/favicon.gif';
import './Navbar.css';

export default function Navbar (){
    return (
        <div className="navigation-bar">
            <img src={logo} alt="App Logo" className="app-logo"/>
        </div>
    )
}