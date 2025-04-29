import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://sales-tracker-backend-wdr5.onrender.com/sales')
      .then(res => {
        setSales(res.data.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#021faa]">Sales Dashboard</h1>
          <Link to="/add-sale" className="bg-[#021faa] text-white px-4 py-2 rounded hover:bg-blue-800 transition">
            Add Sale
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-gray-600">Loading sales...</div>
        ) : sales.length === 0 ? (
          <div className="text-center text-gray-600">No sales recorded yet.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-[#021faa] text-white">
                <tr>
                  <th scope="col" className="px-6 py-4">Executive</th>
                  <th scope="col" className="px-6 py-4">Model</th>
                  <th scope="col" className="px-6 py-4">Amount</th>
                  <th scope="col" className="px-6 py-4">Region</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{sale.executive_name}</td>
                    <td className="px-6 py-4">{sale.model}</td>
                    <td className="px-6 py-4">₹ {sale.amount_collected.toLocaleString()}</td>
                    <td className="px-6 py-4">{sale.region}</td>
                    <td className="px-6 py-4">{new Date(sale.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
