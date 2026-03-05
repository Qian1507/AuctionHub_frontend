import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/useAuth";
import { getMyAuctions } from '../services/auctionService';
import type { AuctionListDto } from '../types/Types';
import AuctionCard from '../components/auction/AuctionCard';
import { Link } from 'react-router-dom';

const MyAuctions: React.FC = () => {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<AuctionListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyAuctions = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
       
        const data = await getMyAuctions();
        setAuctions(data);
      } catch {
        setError("Failed to load your auctions.");
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyAuctions();
  }, [user]);

  if (isLoading) 
    return <div className="text-center mt-10">Loading your listings...</div>;
 if (error)
  return (
    <div className="container mx-auto p-6">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
        {error}
      </div>
    </div>
  );
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Auctions</h1>
          <p className="text-gray-500">Manage the items you are currently selling</p>
        </div>
        <Link 
          to="/auctions/create" 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + Create New
        </Link>
      </div>

      {auctions.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">You haven't created any auctions yet.</p>
          <Link 
          to="/auctions/create"
           className="text-blue-600 font-medium hover:underline mt-2 inline-block">
            Start selling now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <div key={auction.id} className="relative">
              <AuctionCard auction={auction} />
             
              <div className="absolute top-2 right-2">
                {auction.isDisabled ? (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">Disabled</span>
                ) : auction.isOpen ? (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Live</span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-bold">Expired</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAuctions;