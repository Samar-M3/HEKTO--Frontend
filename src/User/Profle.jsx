import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/v1/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-semibold text-pink-600">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h1 className="text-2xl font-semibold">
            Welcome, {user.username}
          </h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>
      
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium capitalize">{user.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Wishlist Items</span>
            <span className="font-medium">
              {user.wishlist?.length || 0}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition">
            Edit Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex-1 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
