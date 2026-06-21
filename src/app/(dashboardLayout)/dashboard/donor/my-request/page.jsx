'use client';

import React, { useEffect, useState } from 'react';
import DashboardHeading from '@/components/DashboardHeading';
import EditRequestModal from '@/components/EditRequestModal';
import { useSession } from '@/lib/auth-client';
import { myRequest } from '@/lib/api/create-request/data';

import {
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@heroui/react';

import { FaEdit, FaTrash, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';

const DonorRequestPage = () => {
  const { data: session } = useSession();

  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await myRequest(session.user.email);
        setRequest(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [session]);

  const handleEdit = (req) => {
    setEditingRequest(req);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log('Delete Request ID:', id);
    // Add your delete functionality here
  };

  const getStatusChip = (status) => {
    const formattedStatus = status || 'Unknown';
    switch (status) {
      case 'Done':
      case 'Completed':
        return (
          <Chip
            size="sm"
            variant="dot"
            color="success"
            className="border-success-200/30 font-medium capitalize px-2"
          >
            {formattedStatus}
          </Chip>
        );
      case 'Inprogress':
      case 'Pending':
        return (
          <Chip
            size="sm"
            variant="dot"
            color="warning"
            className="border-warning-200/30 font-medium capitalize px-2"
          >
            {formattedStatus}
          </Chip>
        );
      default:
        return (
          <Chip
            size="sm"
            variant="dot"
            color="danger"
            className="border-danger-200/30 font-medium capitalize px-2"
          >
            {formattedStatus}
          </Chip>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6">
        <Skeleton className="h-16 w-1/3 rounded-xl bg-rose-500" />
        <Card className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg bg-rose-200" />
            <Skeleton className="h-12 w-full rounded-lg bg-rose-200" />
            <Skeleton className="h-12 w-full rounded-lg bg-rose-200" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeading
          title="My Requests"
          description="Manage and track all your blood donation requests"
        />
      </div>

      <Card
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/5
          bg-slate-900/40
          backdrop-blur-md
          shadow-xl
        "
      >
        {/* Table Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 border-b border-white/5 p-6 sm:items-center sm:justify-between bg-slate-900/20">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Blood Donation Requests
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              View, edit, and keep tracking updates on active requests.
            </p>
          </div>

          <Chip
            size="md"
            variant="flat"
            color="danger"
            className="bg-danger-500/10 text-danger-400 font-bold self-start sm:self-center border border-danger-500/20 rounded-lg"
          >
            {request.length} Total Requests
          </Chip>
        </div>

        {/* Responsive Table Wrapper */}
       
        <div className="w-full overflow-x-auto scrollbar-hide">
          <Table
            removeWrapper
            aria-label="Blood Donation Requests Table"
            classNames={{
              base: "min-w-[700px] w-full",
              th: 'bg-slate-950/60 text-slate-400 font-semibold uppercase text-xs tracking-wider py-4 px-6 border-b border-white/5',
              td: 'py-4 px-6 text-slate-300 align-middle border-b border-white/[0.02]',
              tr: 'hover:bg-white/[0.02] transition-colors duration-150',
            }}
          >
            <TableHeader>
              <TableColumn width={220}>Recipient</TableColumn>
              <TableColumn width={180}>Location</TableColumn>
              <TableColumn width={160}>Date</TableColumn>
              <TableColumn width={120} align="center">Blood Group</TableColumn>
              <TableColumn width={130}>Status</TableColumn>
              <TableColumn width={80} align="right">Actions</TableColumn>
            </TableHeader>

            {/* FIX: Use items prop and pass a callback function instead of .map() */}
            <TableBody
              items={request}
              emptyContent={
                <div className="py-24 text-center flex flex-col items-center justify-center">
                  <div className="text-5xl mb-4 bg-danger-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center border border-danger-500/20">
                    🩸
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    No Requests Found
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs mt-1">
                    You haven&apos;t created any urgent blood requests yet.
                  </p>
                </div>
              }
            >
              {(req) => (
                <TableRow key={req._id}>
                  {/* Recipient Cell */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-sm sm:text-base">
                        {req.recipientName}
                      </span>
                    </div>
                  </TableCell>

                  {/* Location Cell */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <FaMapMarkerAlt className="text-slate-500 text-xs shrink-0" />
                      <span className="truncate max-w-[150px]">
                        {req.recipientDistrict}
                      </span>
                    </div>
                  </TableCell>

                  {/* Date Cell */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <FaCalendarAlt className="text-slate-500 text-xs shrink-0" />
                      <span>{req.donationDate}</span>
                    </div>
                  </TableCell>

                  {/* Blood Group Cell */}
                  <TableCell>
                    <div className="flex justify-center">
                      <Chip
                        size="sm"
                        variant="flat"
                        className="bg-danger-500/20 text-danger-300 font-bold border border-danger-500/30 px-3 py-1 text-xs"
                      >
                        {req.bloodGroup}
                      </Chip>
                    </div>
                  </TableCell>

                  {/* Status Cell */}
                  <TableCell>
                    {getStatusChip(req.status)}
                  </TableCell>

                  {/* Actions Dropdown Cell */}
                  <TableCell>
                    <div className="flex justify-end pr-2">
                      <Dropdown placement="bottom-end" className="bg-slate-900 border border-white/10 text-white rounded-xl">
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-white/10"
                          >
                            <HiDotsVertical className="text-lg" />
                          </Button>
                        </DropdownTrigger>

                        <DropdownMenu
                          aria-label="Request Actions Options"
                          itemClasses={{
                            base: "gap-3 rounded-lg py-2.5 px-3 data-[hover=true]:bg-white/5",
                          }}
                        >
                          <DropdownItem
                            key="edit"
                            startContent={<FaEdit className="text-slate-400" />}
                            onPress={() => handleEdit(req)}
                          >
                            Edit Request
                          </DropdownItem>

                          <DropdownItem
                            key="delete"
                            color="danger"
                            className="text-danger"
                            startContent={<FaTrash />}
                            onPress={() => handleDelete(req._id)}
                          >
                            Delete Request
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Modal Hook */}
      <EditRequestModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingRequest={editingRequest}
      />
    </div>
  );
};

export default DonorRequestPage;