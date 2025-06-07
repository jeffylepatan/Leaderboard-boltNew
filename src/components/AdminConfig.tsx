import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const AdminConfig: React.FC = () => {
  const [config, setConfig] = useState({
    twoYearsTenure: '',
    threeYearsTenure: '',
    fourYearsTenure: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await setDoc(doc(db, 'config', 'leaveCredits'), {
        twoYearsTenure: parseInt(config.twoYearsTenure, 10) || 0,
        threeYearsTenure: parseInt(config.threeYearsTenure, 10) || 0,
        fourYearsTenure: parseInt(config.fourYearsTenure, 10) || 0,
      });
      setSuccess('Configuration saved successfully!');
    } catch (err) {
      setError('Failed to save configuration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSave} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Leave Credits Configuration</h2>
        <input
          className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          type="number"
          name="twoYearsTenure"
          placeholder="2 Years Tenure Leave Credits"
          value={config.twoYearsTenure}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          type="number"
          name="threeYearsTenure"
          placeholder="3 Years Tenure Leave Credits"
          value={config.threeYearsTenure}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          type="number"
          name="fourYearsTenure"
          placeholder="4 Years Tenure Leave Credits"
          value={config.fourYearsTenure}
          onChange={handleChange}
          required
        />
        {success && <div className="text-green-400 mb-2">{success}</div>}
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Save Configuration</button>
      </form>
      <div className="mt-8">
        <Link
          to="/admin/dashboard"
          className="text-blue-500 hover:underline"
        >
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminConfig;
