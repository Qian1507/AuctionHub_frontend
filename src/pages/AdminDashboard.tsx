import React, { useEffect, useState } from "react";
import { getAllUsers, deactivateUser } from "../services/userService";
import { getAllAuctions, disableAuction } from "../services/auctionService";
import type { UserResponseDto, AuctionListDto } from "../types/Types";
import { useAuth } from "../contexts/useAuth";


const AdminDashboard: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [auctions, setAuctions] = useState<AuctionListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const [u, a] = await Promise.all([getAllUsers(), getAllAuctions()]);
        setUsers(u);
        setAuctions(a);
      } catch {
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleBanUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to deactivate this user?")) return;

    try {
      await deactivateUser(id); // PATCH User/Deactivate/{id}
      setUsers(prev =>
        prev.map(u =>
          u.id === id ? { ...u, isActive: false } : u
        )
      );
    } catch {
      alert("Failed to deactivate user.");
    }
  };

  const handleDisableAuction = async (id: number) => {
    if (!window.confirm("Disable this auction?")) return;

    try {
      const success = await disableAuction(id); // PATCH Auction/Disable/{id}
      if (!success) {
        alert("Auction not found or already disabled.");
        return;
      }
      setAuctions(prev =>
        prev.map(a =>
          a.id === id ? { ...a, isDisabled: true } : a
        )
      );
    } catch {
      alert("Failed to disable auction.");
    }
  };

  if (loading) return <div className="p-6">Loading admin data...</div>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 border border-red-100">
          {error}
        </div>
      )}

      {/* Users block */}
      <section className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Users</h2>
          <span className="text-sm text-gray-500">
            Total: {users.length}
          </span>
        </div>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
                 const isSelf = currentUser && currentUser.id === u.id;

                if (isSelf) {
      
                    return (
                        <tr key={u.id} className="border-b last:border-0">
                        <td className="py-2">{u.id}</td>
                        <td className="py-2">{u.email}</td>
                        <td className="py-2">{u.name}</td>
                        <td className="py-2">{u.role}</td>
                        <td className="py-2">
                            {u.isActive ? (
                            <span className="text-green-600 font-semibold">Active</span>
                            ) : (
                            <span className="text-red-600 font-semibold">Banned</span>
                            )}
                        </td>
                        <td className="py-2">
                            <span className="px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-400">
                            You
                            </span>
                        </td>
                        </tr>
                    );
                    }


                 return(
                    <tr key={u.id} className="border-b last:border-0">
                        <td className="py-2">{u.id}</td>
                        <td className="py-2">{u.email}</td>
                        <td className="py-2">{u.name}</td>
                        <td className="py-2">{u.role}</td>
                        <td className="py-2">
                        {u.isActive ? (
                            <span className="text-green-600 font-semibold">Active</span>
                        ) : (
                            <span className="text-red-600 font-semibold">Banned</span>
                        )}
                        </td>
                        <td className="py-2">
                            <button
                                onClick={() => handleBanUser(u.id)}
                                disabled={!u.isActive}
                                className={`px-3 py-1 rounded text-xs font-semibold ${
                                u.isActive
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {isSelf
                                    ? "You"
                                    : u.isActive
                                    ? "Ban user"
                                    : "Banned"}
                            </button>
                        </td>
                    </tr>
                 );
                })}
          </tbody>
        </table>
      </section>

      {/* Auctions block */}
      <section className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Auctions</h2>
          <span className="text-sm text-gray-500">
            Total: {auctions.length}
          </span>
        </div>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Seller</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map(a => (
              <tr key={a.id} className="border-b last:border-0">
                <td className="py-2">#{a.id}</td>
                <td className="py-2">{a.title}</td>
                <td className="py-2">{a.createdByUserName}</td>
                <td className="py-2">
                  {a.isDisabled ? (
                    <span className="text-red-600 font-semibold">Disabled</span>
                  ) : a.isOpen ? (
                    <span className="text-green-600 font-semibold">Live</span>
                  ) : (
                    <span className="text-gray-600 font-semibold">Expired</span>
                  )}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => handleDisableAuction(a.id)}
                    disabled={a.isDisabled}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      a.isDisabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {a.isDisabled ? "Disabled" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
