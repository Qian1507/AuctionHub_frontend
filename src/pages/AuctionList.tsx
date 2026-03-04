import React, { useEffect, useState } from "react";
import { searchAuctions } from "../services/auctionService";
import type { AuctionListDto } from "../types/Types";
import AuctionCard from "../components/auction/AuctionCard";

const AuctionList: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionListDto[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean | undefined>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchAuctions(search, isOpen);
        setAuctions(data);
      } catch {
        setError("Failed to load auctions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [search, isOpen]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search auctions..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={
            isOpen === undefined ? "all" : isOpen ? "true" : "false"
          }
          onChange={(e) =>
            setIsOpen(
              e.target.value === "all"
                ? undefined
                : e.target.value === "true"
            )
          }
        >
          <option value="true">Live Only</option>
          <option value="false">Expired Only</option>
          <option value="all">All Auctions</option>
        </select>
      </div>

      {isLoading && (
        <div className="text-center text-gray-500 mb-4">
          Loading auctions...
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 border border-red-100">
          {error}
        </div>
      )}

      {!isLoading && auctions.length === 0 && !error && (
        <div className="text-center text-gray-500">
          No auctions found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {auctions.map((a) => (
          <AuctionCard key={a.id} auction={a} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
