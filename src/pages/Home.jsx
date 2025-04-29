import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Sales Tracker</h1>
      <Link to="/add-sale" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add New Sale
      </Link>
    </div>
  );
}
