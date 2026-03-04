import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auctionService from "../services/auctionService";
import type { AuctionUpdateDto } from "../types/Types";
import { getErrorMessage } from "../utils/errorUtils";

const AuctionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<AuctionUpdateDto>({
    title: "",
    description: "",
    startingPrice: 0,
    endDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadAuction = async () => {
      try {
        setLoading(true);
        const auction = await auctionService.getAuctionById(
          Number(id)
        );

        setForm({
          title: auction.title,
          description: auction.description,
          startingPrice: auction.startingPrice,
           endDate: auction.endDate
    ? new Date(auction.endDate).toISOString().slice(0, 16)
    : "",
        });
      } catch (err: unknown) {
       setError(getErrorMessage(err, "Failed to load auction"));
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === "startingPrice" ? Number(value) || 0 : value,

    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!id) return;

  try {
    setSaving(true);
    setError(null);

    const payload: AuctionUpdateDto = {
      ...form,
      endDate: form.endDate
        ? new Date(form.endDate).toISOString()
        : "",
    };

    await auctionService.updateAuction(Number(id), payload);
    navigate(`/auctions/${id}`);
  } catch (err: unknown) {
    setError(getErrorMessage(err, "Failed to update auction"));
  } finally {
    setSaving(false);
  }
};

if (loading) return <p>Loading...</p>;


  return (
    <div className="page">
      <h1>Edit auction</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <label>
          Starting price
          <input
            type="number"
            name="startingPrice"
            value={form.startingPrice}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          End date
          <input
            type="datetime-local"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default AuctionEdit;
