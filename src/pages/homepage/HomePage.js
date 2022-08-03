import logo from '../../logo.svg';
import '../../App.scss';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome to JOP Landing Page</p>
                <Link style={{marginTop: '12px'}} className="App-link" to="/auth">Go to signin page</Link>
            </header>
        </div>
    )
}

export default HomePage;