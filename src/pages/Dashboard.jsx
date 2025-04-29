import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [targets, setTargets] = useState([]);
  const [incentives, setIncentives] = useState([]);
  const regions = ['North', 'South', 'East', 'West', 'US', 'Europe', 'UAE'];

  const backend = 'https://sales-tracker-backend-wdr5.onrender.com';

  useEffect(() => {
    Promise.all([
      axios.get(backend + '/sales'),
      axios.get(backend + '/admin/targets'),
      axios.get(backend + '/admin/incentives')
    ]).then(([s, t, i]) => {
      setSales(s.data);
      setTargets(t.data);
      setIncentives(i.data);
    });
  }, []);

  const getSalesCount = (region) =>
    sales.filter(s => s.region === region).length;

  const getExecSales = () => {
    const leaderboard = {};
    sales.forEach(s => {
      if (!leaderboard[s.executive_name]) leaderboard[s.executive_name] = 0;
      leaderboard[s.executive_name] += 1;
    });
    return Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  };

  const totalSales = sales.length;
  const totalTarget = targets.reduce((sum, t) => sum + t.target_devices, 0);
  const totalPercent = totalTarget ? Math.min((totalSales / totalTarget) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h1 className="text-4xl font-bold text-[#021faa] mb-2 text-center">Sales Dashboard</h1>
      <p className="text-center text-gray-600 mb-8">Track targets, rewards, and leaderboard progress</p>

      {/* Overall Sales Progress */}
      <div className="max-w-4xl mx-auto bg-white p-4 mb-10 rounded shadow">
        <div className="flex justify-between mb-2 text-lg font-medium">
          <span>Total Sales Progress</span>
          <span>{totalSales} / {totalTarget} ({totalPercent.toFixed(2)}%)</span>
        </div>
        <div className="w-full h-6 bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-[#021faa]" style={{ width: totalPercent + '%' }}></div>
        </div>
      </div>

      {/* Region Progress Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Region Targets & Progress</h2>
        <div className="space-y-6">
          {regions.map(region => {
            const regionTarget = targets.find(t => t.region === region);
            const regionSales = getSalesCount(region);
            const percent = regionTarget ? Math.min((regionSales / regionTarget.target_devices) * 100, 100) : 0;
            const targetValue = regionTarget?.target_devices || 1;
            const regionIncentives = incentives
              .filter(i => i.region === region)
              .sort((a, b) => a.milestone_devices - b.milestone_devices);

            return (
              <div key={region} className="bg-white p-4 rounded shadow relative">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-[#021faa]">{region}</span>
                  <span className="text-sm text-gray-700">{regionSales} / {regionTarget?.target_devices || 'N/A'} devices</span>
                </div>

                <div className="relative w-full h-6 bg-gray-200 rounded overflow-visible mb-2">
                  <div className="h-full bg-[#021faa]" style={{ width: percent + '%' }}></div>

                  {/* Incentive markers with hover tooltip */}
                  {regionIncentives.map((inc, i) => {
                    const left = Math.min((inc.milestone_devices / targetValue) * 100, 100);
                    const achieved = regionSales >= inc.milestone_devices;
                    return (
                      <div key={i}
                        className="absolute -top-3 z-20 group"
                        style={{ left: `calc(${left}% - 12px)` }}
                      >
                        <div className={
                          "w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-md cursor-pointer " +
                          (achieved ? "bg-green-500 text-white" : "bg-yellow-300 text-black")
                        }>
                          {achieved ? '✅' : '🎯'}
                        </div>
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-max bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          {inc.milestone_devices} → ₹{inc.reward}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full table-auto text-left">
            <thead className="bg-[#021faa] text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Executive</th>
                <th className="px-6 py-3">Sales</th>
              </tr>
            </thead>
            <tbody>
              {getExecSales().map(([name, count], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{idx + 1}</td>
                  <td className="px-6 py-3">{name}</td>
                  <td className="px-6 py-3">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
