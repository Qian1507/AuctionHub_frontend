import type { BidDto } from "../../types/Types";

interface Props {
  bids: BidDto[] | null | undefined;
}

const AuctionBidHistory: React.FC<Props> = ({ bids }) => {
  const hasBids = bids && bids.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800">Bid History</h3>
      </div>

      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {hasBids ? (
          bids!.map((bid) => (
            <div
              key={bid.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {bid.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {bid.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(bid.createdAt).toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-md font-bold text-green-600">
                  {bid.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-10 text-center text-gray-400">
            <p>No bids placed yet.</p>
            <p className="text-sm">Be the first to bid!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionBidHistory;
