import { useState } from 'react';
import axios from 'axios';

export default function AddSale() {
  const [executiveName, setExecutiveName] = useState('');
  const [model, setModel] = useState('Mini');
  const [amountCollected, setAmountCollected] = useState('');
  const [region, setRegion] = useState('North');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sales-tracker-backend-wdr5.onrender.com/sales', {
        executive_name: executiveName,
        model,
        amount_collected: parseFloat(amountCollected),
        region
      });
      setMessage('Sale successfully added!');
      setExecutiveName('');
      setModel('Mini');
      setAmountCollected('');
      setRegion('North');
    } catch (error) {
      setMessage('Error adding sale.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Add Sale</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input value={executiveName} onChange={e => setExecutiveName(e.target.value)} type="text" placeholder="Executive Name" className="w-full p-2 border rounded" required />
        <select value={model} onChange={e => setModel(e.target.value)} className="w-full p-2 border rounded">
          <option value="Mini">Mini</option>
          <option value="Beast">Beast</option>
        </select>
        <input value={amountCollected} onChange={e => setAmountCollected(e.target.value)} type="number" placeholder="Amount Collected" className="w-full p-2 border rounded" required />
        <select value={region} onChange={e => setRegion(e.target.value)} className="w-full p-2 border rounded">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="US">US</option>
          <option value="Europe">Europe</option>
          <option value="UAE">UAE</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
      {message && <div className="mt-4 text-lg">{message}</div>}
    </div>
  );
}
