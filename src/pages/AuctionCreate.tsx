// pages/AuctionCreate.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuctionFormData } from "../components/auction/AuctionForm";
import AuctionForm from "../components/auction/AuctionForm";
import auctionService from "../services/auctionService";
import { getErrorMessage } from "../utils/errorUtils";

const AuctionCreate: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialData: AuctionFormData = {
    title: "",
    description: "",
    startingPrice: "",
    endDate: "",
  };

  const handleSubmit = async (form: AuctionFormData) => {
  try {
    setSaving(true);
    setError(null);

    await auctionService.createAuction({
      title: form.title,
      description: form.description,
      startingPrice: Number(form.startingPrice) || 0,
      startDate: new Date().toISOString(), 
      endDate: form.endDate
        ? new Date(form.endDate).toISOString()
        : new Date().toISOString(),
    });

    navigate("/my-auctions");
  } catch (err: unknown) {
    setError(getErrorMessage(err, "Failed to create auction"));
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create auction</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <AuctionForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Create auction"
        loading={saving}
      />
    </div>
  );
};

export default AuctionCreate;
