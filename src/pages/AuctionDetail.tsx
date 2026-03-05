import React, { useEffect, useState, useCallback } from "react";
import { getAuctionById, placeBid } from "../services/auctionService";
import type { AuctionDetailDto } from "../types/Types";
import { getErrorMessage } from "../utils/errorUtils";
import { useAuth } from "../contexts/useAuth";
import { Link, useParams } from "react-router-dom";
import { cancelLastBid } from "../services/auctionService";


const AuctionDetail: React.FC = () => {
    //Hooks
  const {user}=useAuth();
  const { id } = useParams<{ id: string }>();

  const [auction, setAuction] = useState<AuctionDetailDto | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 

  const loadAuction = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getAuctionById(Number(id));
      setAuction(data);
      setBidAmount((data.currentHighestBid ?? data.startingPrice) + 1);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Auction not found or failed to load."));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAuction();
  }, [loadAuction]);


  const handleBid = useCallback(async () => {
    if (!id || !auction) return;

    try {
      setSaving(true);
      setError(null);
      await placeBid(Number(id), bidAmount); 
    
     alert("Bid placed!");  
      await loadAuction();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Bid too low!"));
    } finally {
      setSaving(false);
    }
  }, [id, bidAmount, auction, loadAuction]);

  
  const handleCancelLastBid = useCallback(async () => {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);
      const ok = await cancelLastBid(Number(id));
      if (!ok) {
        setError("Cannot cancel this bid.");
        return;
      }
      await loadAuction();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Cannot cancel this bid."));
    } finally {
      setSaving(false);
    }
  }, [id, loadAuction]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if (error)
        return (
            <div className="text-center mt-10 text-red-600 font-bold">
                {error}
            </div>
    );
  
  
  if (!auction) return null; 

  const displayPrice = auction.currentHighestBid ?? auction.startingPrice;

  const isOwner =
    user && auction && auction.createdByUserId === user.id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{auction.title}</h1>
      <p className="text-gray-600 my-4">{auction.description}</p>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex justify-between items-center">
        <div>
          <p className="text-sm text-blue-600">Current Price</p>
          <p className="text-3xl font-bold">kr {displayPrice}</p>
        </div>

        {auction.isOpen ? (
            isOwner ? (
            
            <Link
              to={`/auctions/edit/${auction.id}`}
              className="bg-yellow-500 text-white px-6 py-2 rounded font-semibold"
            >
              Edit
            </Link>
          ) : (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              className="border p-2 rounded w-24"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(Number(e.target.value) || 0)
              }
              min={0}
            />
            <button
              onClick={handleBid}
              className="bg-blue-600 text-white px-6 py-2 rounded"
              disabled={saving}
            >
              {saving ? "Placing bid..." : "Place Bid"}
            </button>
            <button
              onClick={handleCancelLastBid}
              className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 disabled:opacity-60"
              disabled={saving}
            >
              Cancel last bid
            </button>
          </div>
          )
        ) : (
          <div className="text-red-600 font-bold">Auction Closed</div>
        )}
      </div>

      {auction.winningBid && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          Winner:{" "}
          <span className="font-bold">{auction.winningBid.userName}</span>{" "}
          with kr{auction.winningBid.amount}
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;