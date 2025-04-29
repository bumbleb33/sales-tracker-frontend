import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminPanel() {
  const [region, setRegion] = useState('North');
  const [targetType, setTargetType] = useState('daily');
  const [targetDevices, setTargetDevices] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const [milestoneRegion, setMilestoneRegion] = useState('North');
  const [milestoneDevices, setMilestoneDevices] = useState('');
  const [reward, setReward] = useState('');

  const backend = "https://sales-tracker-backend-wdr5.onrender.com";

  const handleCreateTarget = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backend + '/admin/targets', {
        region,
        target_type: targetType,
        target_devices: parseInt(targetDevices),
        deadline
      });
      toast.success('🎯 Target Created!');
      setTargetDevices('');
      setDeadline('');
    } catch {
      toast.error('Failed to create target.');
    }
  };

  const handleCreateIncentive = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backend + '/admin/incentives', {
        region: milestoneRegion,
        milestone_devices: parseInt(milestoneDevices),
        reward
      });
      toast.success('🏆 Incentive Created!');
      setMilestoneDevices('');
      setReward('');
    } catch {
      toast.error('Failed to create incentive.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Toaster />
      <h1 className="text-4xl font-bold text-[#021faa] mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Create Target */}
        <form onSubmit={handleCreateTarget} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#021faa]">Create Target</h2>
          <select value={region} onChange={e => setRegion(e.target.value)} className="w-full p-3 rounded border">
            {['North', 'South', 'East', 'West', 'US', 'Europe', 'UAE'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select value={targetType} onChange={e => setTargetType(e.target.value)} className="w-full p-3 rounded border">
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
          <input value={targetDevices} onChange={e => setTargetDevices(e.target.value)} type="number" placeholder="Target Devices" className="w-full p-3 rounded border" required />
          <input value={deadline} onChange={e => setDeadline(e.target.value)} type="date" className="w-full p-3 rounded border" required />
          <button type="submit" className="w-full bg-[#021faa] text-white py-3 rounded hover:bg-blue-800">Create Target</button>
        </form>

        {/* Create Incentive */}
        <form onSubmit={handleCreateIncentive} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#021faa]">Create Incentive</h2>
          <select value={milestoneRegion} onChange={e => setMilestoneRegion(e.target.value)} className="w-full p-3 rounded border">
            {['North', 'South', 'East', 'West', 'US', 'Europe', 'UAE'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input value={milestoneDevices} onChange={e => setMilestoneDevices(e.target.value)} type="number" placeholder="Milestone Devices" className="w-full p-3 rounded border" required />
          <input value={reward} onChange={e => setReward(e.target.value)} type="text" placeholder="Reward Description" className="w-full p-3 rounded border" required />
          <button type="submit" className="w-full bg-[#021faa] text-white py-3 rounded hover:bg-blue-800">Create Incentive</button>
        </form>

      </div>

      <Link to="/admin-view" className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg">
        View Targets & Incentives
      </Link>
    </div>
  );
}
