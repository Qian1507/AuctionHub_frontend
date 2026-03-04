
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuction } from '../services/auctionService';
import type { AuctionCreateDto } from "../types/Types";



const AuctionCreate: React.FC = () => {
  const navigate = useNavigate();

   const [form, setForm] = useState<AuctionCreateDto>({
    title: "",
    description: "",
    startingPrice: 0,
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await createAuction(form);
    if (success) navigate('/auctions');
    else alert("Check your dates. End date must be after Start date.");
  };

  return (
     <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold">Create New Auction</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Starting Price"
        value={form.startingPrice}
        onChange={(e) =>
          setForm({ ...form, startingPrice: Number(e.target.value) })
        }
      />

      <label className="block text-sm">Start Date</label>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      />

      <label className="block text-sm">End Date</label>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Create Auction
      </button>
    </form>
  );
};

export default AuctionCreate;