export type MemberStatus = 'active' | 'inactive' | 'pending';

export type MembershipType = 'regular' | 'premium' | 'lifetime';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  membershipNumber: string;
  status: MemberStatus;
  membershipType: MembershipType;
  joinDate: string;
  financialSummary: {
    totalShares: number;
    totalLoans: number;
    currentBalance: number;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface MemberFilters {
  search: string;
  status: MemberStatus | 'all';
  membershipType: MembershipType | 'all';
}

export type SortField = 'name' | 'email' | 'status' | 'membershipType' | 'joinDate';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
