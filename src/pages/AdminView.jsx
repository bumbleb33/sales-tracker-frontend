import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminView() {
  const [targets, setTargets] = useState([]);
  const [incentives, setIncentives] = useState([]);

  const backend = "https://sales-tracker-backend-wdr5.onrender.com";

  useEffect(() => {
    axios.get(backend + '/admin/targets').then(res => setTargets(res.data));
    axios.get(backend + '/admin/incentives').then(res => setIncentives(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#021faa] mb-8 text-center">Targets & Incentives</h1>
        <Link to="/admin-panel" className="block mb-8 text-center text-blue-600 hover:underline">← Back to Admin Panel</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Targets */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#021faa] mb-4">Targets</h2>
            <ul className="space-y-4">
              {targets.map((t, i) => (
                <li key={i} className="border-b pb-2">
                  <strong>{t.region}</strong> — {t.target_type} — {t.target_devices} devices by {new Date(t.deadline).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>

          {/* Incentives */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#021faa] mb-4">Incentives</h2>
            <ul className="space-y-4">
              {incentives.map((inc, i) => (
                <li key={i} className="border-b pb-2">
                  <strong>{inc.region}</strong> — {inc.milestone_devices} devices → Reward: {inc.reward}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
