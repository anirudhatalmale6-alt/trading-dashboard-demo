import BalanceCard from '../components/BalanceCard';
import CandlestickChart from '../components/CandlestickChart';
import TransactionHistory from '../components/TransactionHistory';
import Holdings from '../components/Holdings';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <BalanceCard />
      <div className="dashboard-grid">
        <CandlestickChart />
        <Holdings />
      </div>
      <TransactionHistory />
    </div>
  );
};

export default Dashboard;
