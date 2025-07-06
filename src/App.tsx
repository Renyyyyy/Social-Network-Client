import { Outlet } from 'react-router-dom';
import './App.css';
import AuthChecker from './components/forms/authChecker/AuthChecker';

const App = () => {
    return (
        <div className="app-container">
            <Outlet/>
        </div>
    );
};

export default App;