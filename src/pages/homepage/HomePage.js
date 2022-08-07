import logo from '../../logo.svg';
import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';

function HomePage() {
    return (
        <div className="App">
            <Header title="Welcome"/>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className='text-coal'>Welcome to JOP Landing Page</p>
                <Link style={{marginTop: '12px'}} className="App-link" to="/auth">Go to signin page</Link>
                <Link style={{marginTop: '12px'}} className="App-link" to="/sample">Go to sample page</Link>
            </header>
        </div>
    )
}

export default HomePage;