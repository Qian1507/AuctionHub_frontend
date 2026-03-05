// pages/AuctionEdit.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AuctionFormData } from "../components/auction/AuctionForm";
import AuctionForm from "../components/auction/AuctionForm";
import auctionService from "../services/auctionService";
import { getErrorMessage } from "../utils/errorUtils";

const AuctionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<AuctionFormData>({
    title: "",
    description: "",
    startingPrice: "",
    endDate: "",
  });
  const [hasBids, setHasBids] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadAuction = async () => {
      try {
        setLoading(true);
        setError(null);
        const auction = await auctionService.getAuctionById(Number(id));

        setInitialData({
          title: auction.title,
          description: auction.description,
          startingPrice: String(auction.startingPrice),
          endDate: auction.endDate
            ? new Date(auction.endDate).toISOString().slice(0, 16)
            : "",
        });

        setHasBids(auction.hasBids);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load auction"));
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [id]);

  const handleSubmit = async (form: AuctionFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);

      await auctionService.updateAuction(Number(id), {
        title: form.title,
        description: form.description,
        startingPrice: Number(form.startingPrice) || 0,
        endDate: form.endDate
          ? new Date(form.endDate).toISOString()
          : "",
      });

      navigate(`/auctions/${id}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to update auction"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit auction</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <AuctionForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        disablePrice={hasBids}
        loading={saving}
      />
    </div>
  );
};

export default AuctionEdit;
