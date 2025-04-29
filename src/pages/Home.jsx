import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Sales Tracker</h1>
      <Link to="/add-sale" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold">
        Add New Sale
      </Link>
    </div>
  );
}
