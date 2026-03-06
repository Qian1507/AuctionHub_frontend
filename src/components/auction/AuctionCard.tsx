import type { AuctionListDto } from "../../types/Types";
import { Link } from "react-router-dom";

interface Props {
  auction: AuctionListDto;
}

const AuctionCard: React.FC<Props> = ({ auction }) => {
  const isFinished = new Date(auction.endDate) < new Date();
  const displayPrice =auction.currentHighestBid ?? auction.startingPrice;

  
  const imageUrl = `https://picsum.photos/seed/${auction.id}/400/300`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${
            auction.isDisabled
              ? "bg-red-500"
              : isFinished
              ? "bg-gray-500"
              : "bg-green-600"
          }`}
        >
          {auction.isDisabled
            ? "Disabled"
            : isFinished
            ? "Finished"
            : "Live"}
        </div>
      </div>

     
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
          {auction.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {auction.description}
        </p>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-gray-500 text-xs font-medium">
              Current Bid
            </p>
            <p className="text-xl font-extrabold text-blue-600">
              {displayPrice.toLocaleString("sv-SE", {
                style: "currency",
                currency: "SEK",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>

          <Link
            to={`/auctions/${auction.id}`}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
