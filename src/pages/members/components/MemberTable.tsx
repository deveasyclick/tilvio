import React from 'react';
import { Member, SortConfig, SortField } from '../../../types/member';
import Image from '../../../components/Image';
import { getStatusColor } from '../../../utils/getStatusColor';
import Table from '../../../components/Table';
import type { TableColumn, TableAction } from '../../../components/Table/types';

interface MemberTableProps {
  members: Member[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onEdit: (member: Member) => void;
  onView: (member: Member) => void;
  onDelete: (member: Member) => void;
  selectedMembers: string[];
  onSelectMember: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  sortConfig,
  onSort,
  onEdit,
  onView,
  onDelete,
  selectedMembers,
  onSelectMember,
  onSelectAll,
}) => {
  // Helper function to get membership type label
  const getMembershipTypeLabel = (type: Member['membershipType']) => {
    switch (type) {
      case 'regular':
        return 'Regular';
      case 'premium':
        return 'Premium';
      case 'lifetime':
        return 'Lifetime';
      default:
        return type;
    }
  };

  // Define table columns
  const columns: TableColumn<Member, SortField>[] = [
    {
      id: 'name',
      header: 'Name',
      sortable: true,
      accessor: (member) => (
        <div className="flex items-center text-gray-900 whitespace-nowrap dark:text-white">
          <Image
            className="w-10 h-10 rounded-full"
            src={member.avatarUrl || ''}
            alt={`${member.firstName} ${member.lastName}`}
            fallbackSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/default-avatar.png"
            objectFit="cover"
          />
          <div className="pl-3">
            <div className="text-base font-semibold">
              {member.firstName} {member.lastName}
            </div>
            <div className="font-normal text-gray-500">
              {member.membershipNumber}
            </div>
          </div>
        </div>
      ),
      className: 'whitespace-nowrap',
    },
    {
      id: 'email',
      header: 'Email',
      sortable: true,
      accessor: (member) => member.email,
    },
    {
      id: 'membershipType',
      header: 'Membership',
      sortable: true,
      accessor: (member) => getMembershipTypeLabel(member.membershipType),
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      accessor: (member) => (
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${getStatusColor(member.status)} mr-2`}></div>
          <span className="capitalize">{member.status}</span>
        </div>
      ),
    },
    {
      id: 'joinDate',
      header: 'Join Date',
      sortable: true,
      accessor: (member) => new Date(member.joinDate).toLocaleDateString(),
    },
  ];

  // Define table actions
  const actions: TableAction<Member>[] = [
    {
      icon: 'eye',
      label: 'View',
      onClick: onView,
      className: 'text-blue-600 dark:text-blue-500',
    },
    {
      icon: 'edit',
      label: 'Edit',
      onClick: onEdit,
      className: 'text-blue-600 dark:text-blue-500',
    },
    {
      icon: 'trash',
      label: 'Delete',
      onClick: onDelete,
      className: 'text-red-600 dark:text-red-500',
    },
  ];

  return (
    <Table
      data={members}
      columns={columns}
      keyField="id"
      actions={actions}
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={true}
      selectedItems={selectedMembers}
      onSelectItem={onSelectMember}
      onSelectAll={onSelectAll}
      emptyMessage="No members found"
    />
  );
};

export default MemberTable;
