
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { getAllAuctions } from "../services/auctionService";
import type { UserResponseDto, AuctionListDto } from "../types/Types";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [auctions, setAuctions] = useState<AuctionListDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [u, a] = await Promise.all([
          getAllUsers(),
          getAllAuctions(),
        ]);
        setUsers(u);
        setAuctions(a);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-6">Loading admin data...</div>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-2">Users</h2>
        <p className="text-sm text-gray-500 mb-2">
          Total: {users.length}
        </p>
        <ul className="space-y-1 text-sm">
          {users.map((u) => (
            <li key={u.id}>
              {u.email} ({u.role})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Auctions</h2>
        <p className="text-sm text-gray-500 mb-2">
          Total: {auctions.length}
        </p>
        <ul className="space-y-1 text-sm">
          {auctions.map((a) => (
            <li key={a.id}>
              #{a.id} {a.title} {a.isDisabled ? "(disabled)" : ""}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
