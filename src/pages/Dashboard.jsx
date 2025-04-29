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

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h1 className="text-4xl font-bold text-[#021faa] mb-6 text-center">Sales Dashboard</h1>

      {/* Region Progress Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Region Targets & Progress</h2>
        <div className="space-y-4">
          {regions.map(region => {
            const regionTarget = targets.find(t => t.region === region);
            const regionSales = getSalesCount(region);
            const percent = regionTarget ? Math.min((regionSales / regionTarget.target_devices) * 100, 100) : 0;
            const regionIncentives = incentives
              .filter(i => i.region === region)
              .sort((a, b) => a.milestone_devices - b.milestone_devices);

            return (
              <div key={region} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{region}</span>
                  <span>{regionSales} / {regionTarget?.target_devices || 'N/A'} devices</span>
                </div>
                <div className="w-full h-5 bg-gray-200 rounded overflow-hidden mb-2">
                  <div className="h-full bg-[#021faa]" style={{ width: percent + '%' }}></div>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {regionIncentives.map((i, idx) => (
                    <div key={idx} className={`px-3 py-1 rounded-full ${regionSales >= i.milestone_devices ? 'bg-green-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                      🎯 {i.milestone_devices} → {i.reward}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mb-12">
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
