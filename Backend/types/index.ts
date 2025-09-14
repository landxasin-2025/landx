export interface User {
  id: string
  email: string
  name: string
  role: "ADMIN" | "AGENT" | "CITIZEN"
  createdAt: Date
  updatedAt: Date
}

export interface Land {
  id: string
  title: string
  description?: string
  coordinates: [number, number]
  area: number
  owner: string
  ownerId: string
  status: "PENDING" | "VERIFIED" | "DISPUTED" | "RESOLVED"
  nftTokenId?: string
  blockchainHash?: string
  createdAt: Date
  updatedAt: Date
}

export interface Conflict {
  id: string
  landId: string
  type: "BOUNDARY" | "OWNERSHIP" | "DOUBLE_SALE" | "DOCUMENTATION"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  description: string
  reportedBy: string
  status: "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED"
  aiPredictionScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface BlockchainTransaction {
  id: string
  landId: string
  transactionHash: string
  blockNumber: number
  gasUsed: number
  status: "PENDING" | "CONFIRMED" | "FAILED"
  createdAt: Date
}

export interface GeoData {
  id: string
  landId: string
  imageUrl: string
  coordinates: [number, number][]
  analysisResult?: any
  droneData?: any
  satelliteData?: any
  createdAt: Date
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthRequest extends Request {
  user?: User
}
