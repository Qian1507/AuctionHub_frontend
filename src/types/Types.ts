/**
 * Authentication & User DTOs
 */
export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserRegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponseDto {
    user: UserResponseDto;
    token: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
    isActive:boolean;
}

export interface UpdatePasswordDto {
    currentPassword: string;
    newPassword: string;
}

/**
 * Auction DTOs
 */
export interface Auction {
  id: number;
  title: string;
  description: string;
  startingPrice: number;   
  startDate: string;       
  endDate: string;         
  createdByUserId: number;
  isDisabled: boolean;
  isOpen: boolean;       
  createdByUserName?: string;
  bids?: Bid[];
}

export interface AuctionListDto {
    id: number;
    title: string;
    description: string;
    startingPrice: number;
    currentHighestBid: number;
    startDate: string;
    endDate: string;
    createdByUserId: number;
    createdByUserName: string;
    isOpen: boolean;
    isDisabled: boolean;
}

export interface AuctionDetailDto {
    id: number;
    title: string;
    description: string;
    startingPrice: number;
    startDate: string;
    endDate: string;
    createdByUserId: number;
    createdByUserName: string;
    createdByUserEmail: string;
    isDisabled: boolean;
    isOpen: boolean;
    currentHighestBid: number;
    winningBid: BidDto | null;
    bids: BidDto[];
    hasBids: boolean;
}

export interface AuctionCreateDto {
    title: string;
    description: string;
    startingPrice: number;
    startDate: string;
    endDate: string;
}

export interface AuctionUpdateDto {
    title: string;
    description: string;
    startingPrice: number;
    endDate: string;
}

/**
 * Bid DTOs
 */

export interface Bid {
  id: number;
  amount: number;        // decimal -> number
  createdAt: string;     // DateTime -> string (ISO)

  auctionId: number;
  userId: number;
  auctionTitle?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface BidDto {
    id: number;
    auctionId: number;
    userId: number;
    userName: string;
    amount: number;
    createdAt: string;
}

export interface BidCreateDto {
    amount: number;
    auctionId: number; 
}




