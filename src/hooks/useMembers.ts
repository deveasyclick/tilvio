import { useState, useMemo, useCallback } from 'react';
import { Member, MemberFilters, SortConfig } from '../types/member';
import { mockMembers } from '../data/mockMembers';

interface UseMembersResult {
  members: Member[];
  filteredMembers: Member[];
  totalMembers: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  filters: MemberFilters;
  sortConfig: SortConfig;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: Partial<MemberFilters>) => void;
  setSortConfig: (config: SortConfig) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: MemberFilters = {
  search: '',
  status: 'all',
  membershipType: 'all',
};

const DEFAULT_SORT: SortConfig = {
  field: 'name',
  direction: 'asc',
};

export function useMembers(initialPageSize = 10): UseMembersResult {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // State for filtering and sorting
  const [filters, setFiltersState] = useState<MemberFilters>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState<SortConfig>(DEFAULT_SORT);

  // All members (would be fetched from API in a real app)
  const members = useMemo(() => mockMembers, []);
  
  // Filter members based on search and filter criteria
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const nameMatches = `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchLower);
      const emailMatches = member.email.toLowerCase().includes(searchLower);
      const idMatches = member.membershipNumber.toLowerCase().includes(searchLower);
      
      const matchesSearch = !filters.search || nameMatches || emailMatches || idMatches;
      
      // Status filter
      const matchesStatus = filters.status === 'all' || member.status === filters.status;
      
      // Membership type filter
      const matchesType = 
        filters.membershipType === 'all' || 
        member.membershipType === filters.membershipType;
      
      return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => {
      // Sort based on the current sort configuration
      if (sortConfig.field === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return sortConfig.direction === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      
      if (sortConfig.field === 'email') {
        return sortConfig.direction === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      
      if (sortConfig.field === 'status') {
        return sortConfig.direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      
      if (sortConfig.field === 'membershipType') {
        return sortConfig.direction === 'asc'
          ? a.membershipType.localeCompare(b.membershipType)
          : b.membershipType.localeCompare(a.membershipType);
      }
      
      if (sortConfig.field === 'joinDate') {
        return sortConfig.direction === 'asc'
          ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      }
      
      return 0;
    });
  }, [members, filters, sortConfig]);
  
  // Calculate pagination values
  const totalMembers = filteredMembers.length;
  const totalPages = Math.ceil(totalMembers / pageSize);
  
  // Ensure current page is valid after filtering
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
  
  // Set filters with partial updates
  const setFilters = useCallback((newFilters: Partial<MemberFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);
  
  // Reset filters to defaults
  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);
  
  return {
    members,
    filteredMembers: filteredMembers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    totalMembers,
    currentPage,
    totalPages,
    pageSize,
    filters,
    sortConfig,
    setCurrentPage,
    setPageSize,
    setFilters,
    setSortConfig,
    resetFilters,
  };
}
