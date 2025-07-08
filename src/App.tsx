import { Outlet } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
};

export default App;
