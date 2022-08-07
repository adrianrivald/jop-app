import logo from '../../logo.svg';
import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';

function HomePage() {
    return (
        <div className="App">
            <Header title="Penugasan" isWithNotification={true} />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome to JOP Landing Page</p>
                <Link style={{marginTop: '12px'}} className="App-link" to="/auth">Go to signin page</Link>
            </header>
        </div>
    )
}

export default HomePage;