import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';

const COLORS = ['#021faa', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardCharts() {
  const [sales, setSales] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const backend = 'https://sales-tracker-backend-wdr5.onrender.com';

  useEffect(() => {
    axios.get(backend + '/sales').then(res => {
      const data = res.data;
      setSales(data);

      // Region-wise aggregation
      const regionMap = {};
      const modelMap = { Mini: 0, Beast: 0 };
      const dayMap = {};

      data.forEach(sale => {
        // region count
        regionMap[sale.region] = (regionMap[sale.region] || 0) + 1;

        // model split
        modelMap[sale.model] = (modelMap[sale.model] || 0) + 1;

        // date tracking
        const dateKey = new Date(sale.date).toISOString().split('T')[0];
        dayMap[dateKey] = (dayMap[dateKey] || 0) + 1;
      });

      setRegionData(Object.entries(regionMap).map(([region, count]) => ({ region, count })));
      setModelData(Object.entries(modelMap).map(([model, value], i) => ({ name: model, value, fill: COLORS[i % COLORS.length] })));

      const days = Object.entries(dayMap).map(([date, count]) => ({ date, count }));
      setDailyData(days.sort((a, b) => new Date(a.date) - new Date(b.date)));
    });
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-[#021faa] mb-6 text-center">📊 Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Region Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Sales by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#021faa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Model Split Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Device Model Split</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={modelData} cx="50%" cy="50%" outerRadius={100} label>
                {modelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Sales Line Chart */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-2 text-center">Daily Sales (Last 7 days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#021faa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
