import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button
                onClick={fetchProfile}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Fetch Profile (Test API)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;