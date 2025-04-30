import { useState, useEffect } from 'react';
import axios from 'axios';

const quotes = [
  "Every charger you place powers a future.",
  "Sell like the world depends on it — because it does.",
  "One charge, one change, one future — you create it.",
  "The faster you move, the faster the world moves.",
  "DeCharge your limits. Empower the future.",
  "Small wins daily build unstoppable momentum."
];

export default function AddSale() {
  const [executiveName, setExecutiveName] = useState('');
  const [model, setModel] = useState('Mini');
  const [amountCollected, setAmountCollected] = useState('');
  const [region, setRegion] = useState('North');
  const [message, setMessage] = useState('');
  const [randomQuote, setRandomQuote] = useState('');
  const [unitsSold, setUnitsSold] = useState('');


  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[index]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sales-tracker-backend-wdr5.onrender.com/sales', {
        executive_name: executiveName,
        model,
        amount_collected: parseFloat(amountCollected),
        region
      });
      setMessage('✅ Sale successfully added!');
      setExecutiveName('');
      setModel('Mini');
      setAmountCollected('');
      setRegion('North');
    } catch (error) {
      setMessage('❌ Error adding sale.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-blue-400">{randomQuote}</h1>
      <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-8 mt-8 w-full max-w-md space-y-6">
        <input 
          value={executiveName} 
          onChange={e => setExecutiveName(e.target.value)} 
          type="text" 
          placeholder="Executive Name" 
          className="w-full p-3 rounded-md bg-gray-700/30 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" 
          required 
        />
        <select 
          value={model} 
          onChange={e => setModel(e.target.value)} 
          className="w-full p-3 rounded-md bg-gray-700/30 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Mini">Mini</option>
          <option value="Beast">Beast</option>
        </select>
        <input 
          value={amountCollected} 
          onChange={e => setAmountCollected(e.target.value)} 
          type="number" 
          placeholder="Amount Collected" 
          className="w-full p-3 rounded-md bg-gray-700/30 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" 
          required 
        />

        <input
          type="number"
          value={unitsSold}
          onChange={e => setUnitsSold(e.target.value)}
          placeholder="Units Sold "
          className="w-full p-3 rounded-md bg-gray-700/30 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />

        <select 
          value={region} 
          onChange={e => setRegion(e.target.value)} 
          className="w-full p-3 rounded-md bg-gray-700/30 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="US">US</option>
          <option value="Europe">Europe</option>
          <option value="UAE">UAE</option>
        </select>
        <button 
          type="submit" 
          className="w-full p-3 rounded-md bg-blue-500 hover:bg-blue-600 transition text-white font-semibold tracking-wide"
        >
          Submit Sale
        </button>
      </form>
      {message && <div className="mt-6 text-xl font-semibold">{message}</div>}
    </div>
  );
}
