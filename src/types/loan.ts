/**
 * Loan status type
 */
export type LoanStatus = 'pending' | 'approved' | 'active' | 'completed' | 'rejected' | 'defaulted';

/**
 * Loan type definition
 */
export type Loan = {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  purpose: string;
  term: number; // in months
  interestRate: number;
  status: LoanStatus;
  approvalDate: string | null;
  disbursementDate: string | null;
  nextPaymentDate: string | null;
  totalPaid: number;
  remainingBalance: number;
};

/**
 * Loan filter options
 */
export type LoanFilterOptions = {
  status?: LoanStatus | 'all';
  purpose?: string | 'all';
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
};
