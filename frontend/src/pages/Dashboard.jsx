import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VideoList from '../components/videos/VideoList';
import './DashboardStyles.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Bienvenido, <span>{user?.name || user?.username}</span>
      </h1>
      <VideoList />
    </div>
  );
};

export default Dashboard;