import axiosInstance from "../api/axiosInstance";
import type {
  AuctionDetailDto,
  AuctionListDto,
  AuctionCreateDto,
  AuctionUpdateDto,
  BidCreateDto,
} from "../types/Types";

/**
 * GET /api/Auction/Search?searchTerm=&isOpen=
 
 */
export const searchAuctions = async (
  searchTerm?: string,
  isOpen?: boolean | null
): Promise<AuctionListDto[]> => {
  const response = await axiosInstance.get<AuctionListDto[]>("Auction/Search", {
    params: { searchTerm, isOpen },
  });
  return response.data;
};

/**
 * GET /api/Auction/Search?isOpen=true
 
 */
export const getActiveAuctions = async (
  searchTerm?: string
): Promise<AuctionListDto[]> => {
  const response = await axiosInstance.get<AuctionListDto[]>("Auction/Search", {
    params: { searchTerm, isOpen: true },
  });
  return response.data;
};

/**
 * GET /api/Auction/GetById/{id}?includeHistory=true
 */
export const getAuctionById = async (
  id: number,
  includeHistory: boolean = true
): Promise<AuctionDetailDto> => {
  const response = await axiosInstance.get<AuctionDetailDto>(
    `Auction/GetById/${id}`,
    { params: { includeHistory } }
  );
  return response.data;
};

/**
 * POST /api/Auction/Create
 */
export const createAuction = async (
  dto: AuctionCreateDto
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      "Auction/Create",
      dto
    );
    return { success: response.status === 200, message: response.data.message };
  } catch {
    return { success: false };
  }
};

/**
 * PUT /api/Auction/Update/{id}
 */
export const updateAuction = async (
  id: number,
  dto: AuctionUpdateDto
): Promise<string> => {
  const response = await axiosInstance.put<{ message: string }>(
    `Auction/Update/${id}`,
    dto
  );
  return response.data.message;
};

/**
 * POST /api/Auction/PlaceBid/{id}
 */
export const placeBid = async (
  auctionId: number,
  amount:number
): Promise<boolean> => {
    const dto:BidCreateDto ={
        amount:amount,
        auctionId:auctionId
    };
  const response = await axiosInstance.post<{ message: string }>(
    `Auction/PlaceBid/${auctionId}`,
    dto
  );
  return response.status === 200;
};


/**
 * DELETE /api/Auction/CancelBid/{id}
 */
export const cancelLastBid = async (auctionId: number): Promise<boolean> => {
  const response = await axiosInstance.delete<void>(
    `Auction/CancelBid/${auctionId}`
  );
  return response.status === 204 || response.status === 200;
};

/**
 * PATCH /api/Auction/Disable/{id}  (Admin)
 */
export const disableAuction = async (id: number): Promise<boolean> => {
  const response = await axiosInstance.patch<{ message: string }>(
    `Auction/Disable/${id}`
  );
  return response.status === 200;
};

/**
 * GET /api/Auction/MyAuctions
 */
export const getMyAuctions = async (): Promise<AuctionListDto[]> => {
  const response = await axiosInstance.get<AuctionListDto[]>(
    "Auction/MyAuctions"
  );
  return response.data;
};

/**
 * GET /api/Auction/GetAllAuctions?searchTerm=  (Admin)
 */
export const getAllAuctions = async (
  searchTerm?: string
): Promise<AuctionListDto[]> => {
  const response = await axiosInstance.get<AuctionListDto[]>(
    "Auction/GetAllAuctions",
    { params: { searchTerm } }
  );
  return response.data;
};

const auctionService = {
    searchAuctions,
    getActiveAuctions,
    getAuctionById,
    createAuction,
    updateAuction,
    placeBid,
    cancelLastBid,
    disableAuction,
    getMyAuctions,
    getAllAuctions
};

export default auctionService;