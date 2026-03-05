
import React, { useState, useEffect } from "react";

export type AuctionFormData = {
  title: string;
  description: string;
  startingPrice: string; 
  endDate: string;
};

type AuctionFormProps = {
  initialData: AuctionFormData;
  onSubmit: (data: AuctionFormData) => void;
  submitLabel: string;          
  disablePrice?: boolean;       
  loading?: boolean;            
};

const AuctionForm: React.FC<AuctionFormProps> = ({
  initialData,
  onSubmit,
  submitLabel,
  disablePrice = false,
  loading = false,
}) => {
  const [form, setForm] = useState<AuctionFormData>(initialData);

  
  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Starting price</label>
        <input
          type="number"
          name="startingPrice"
          value={form.startingPrice}
          onChange={handleChange}
          min={0}
          disabled={disablePrice}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">End date</label>
        <input
          type="datetime-local"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default AuctionForm;
