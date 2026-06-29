'use client'
import DeleteRequestModal from '@/components/DeleteRequestModal';
import EditRequestModal from '@/components/EditRequestModal';
import { baseUrl } from '@/lib/api/baseUrl';
import { authHeader } from '@/lib/api/server';
import { Button, Card, Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableContent, TableHeader, TableRow } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaFilter, FaCheck, FaTimes, FaEye, FaUser } from 'react-icons/fa';

const RequestTable = ({ request = [], onUpdateStatus }) => {

  const data = request?.data || request || [];
  const page = request?.page || 1;
  const totalPages = request?.totalPage || 1;
  const pages = [];
  const router = useRouter()
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Status Filter Logic
  const filteredRequests = data.filter((req) => {
    if (selectedStatus === "All Status") return true;
    const currentStatus = (req.status || "inprogress").toLowerCase();
    const targetedStatus = selectedStatus.toLowerCase().replace(/\s+/g, '');
    return currentStatus === targetedStatus;
  });




  // Handler for updating status directly from the action row (Inprogress -> Done / Cancelled)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(await authHeader())
        },
        body: JSON.stringify({ status: newStatus }), // Send the status to the backend
      });

      if (!res.ok) {
        throw new Error(`Failed to update status: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Status changed successfully')
        router.refresh()

      }
      console.log("Status updated successfully:", data);

      // Call your refresh or update state function here
      if (onUpdateStatus) {
        onUpdateStatus(id, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {/* Filter Dropdown Area */}
      <div className="flex justify-end items-center mb-4">
        <div className="relative inline-block text-left">
          <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-xl px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-50 cursor-pointer">
            <FaFilter className="text-slate-400 text-xs" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer text-slate-800 font-semibold"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Inprogress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-2">
        <Card className="border border-white bg-red-800 backdrop-blur-xl shadow-2xl p-6 ">
          <div className="p-0 overflow-x-auto">
            <Table aria-label="My Blood Requests">
              <TableContent>
                <TableHeader className="bg-white border-b rounded-t-xl">
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100" isRowHeader>Recipient</TableColumn>
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">Location</TableColumn>
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">DATE</TableColumn>
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">Need</TableColumn>
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">STATUS</TableColumn>
                  <TableColumn className="py-4 px-6 text-black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={<p className="text-white py-10 text-center font-medium">No donation requests match this filter.</p>}>
                  {filteredRequests?.map((req) => {
                    const status = (req.status || "inprogress").toLowerCase();

                    return (
                      <TableRow key={req._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                        {/* Recipient Column */}
                        <TableCell className="py-4 px-6 align-middle font-bold text-black">
                          <span className="line-clamp-1 truncate max-w-[150px]">{req.recipientName}</span>
                        </TableCell>

                        {/* Location Column */}
                        <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.recipientDistrict}</TableCell>

                        {/* Date Column */}
                        <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.donationDate}</TableCell>

                        {/* Blood Group Column */}
                        <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.bloodGroup}</TableCell>

                        {/* Status Column + Conditional Donor Info Card */}
                        <TableCell className="py-4 px-6 align-middle">
                          <div className="flex flex-col gap-2">
                            <Chip
                              size="sm"
                              className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 w-fit ${status === "done"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : status === "inprogress" || status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                  : "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}
                            >
                              {req.status || "Inprogress"}
                            </Chip>

                            {/* Requirement: Donor info shows ONLY while status is 'inprogress' */}
                            {status === "inprogress" && req.donorName && (
                              <div className="flex items-start gap-2 bg-black/20 text-white p-2 rounded-lg max-w-[200px] border border-white/10 shadow-sm">
                                <FaUser className="text-yellow-400 mt-1 flex-shrink-0" size={12} />
                                <div className="text-[11px] leading-tight">
                                  <p className="font-semibold text-yellow-300 truncate">{req.donorName}</p>
                                  <p className="text-white/70 truncate text-[10px]">{req.donorEmail}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Actions Column with Business Rules */}
                        <TableCell className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-2.5">

                            {/* CASE 1: Status is In Progress -> Show Done & Cancel buttons */}
                            {status === "inprogress" && (
                              <>
                                {/* Complete/Done Button */}
                                <Button
                                  size="sm"
                                  className="bg-green-200  text-green-600  text-xs px-2 h-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-1"
                                  onPress={() => handleStatusChange(req._id, "Done")}
                                >
                                  <FaCheck size={7} />
                                </Button>

                                {/* Cancel Button */}
                                <Button
                                  size="sm"
                                  className="bg-red-200  text-red-700 font-bold text-xs px-2 h-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-1"
                                  onPress={() => handleStatusChange(req._id, "Cancelled")}
                                >
                                  <FaTimes size={6} />
                                </Button>
                              </>
                            )}

                            {/* CASE 2: Status is Pending -> Show Edit & Delete controls */}
                            {status === "pending" && (
                              <>
                                {/* Redirects to Edit Page per guidelines */}
                                {/* Triggers the Edit Request Modal */}
                                <Button
                                  isIconOnly
                                  size="sm"
                                  radius="md"
                                  className="h-8 w-8 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/30 transition-all"
                                  onPress={() => {
                                    setEditingRequest(req);
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <FaEdit size={12} />
                                </Button>

                                {/* Delete Confirmation trigger */}
                                <Button
                                  isIconOnly
                                  size="sm"
                                  radius="md"
                                  className="h-8 w-8 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/30 transition-all"
                                  onPress={() => { setDeletedId(req._id); setIsDeleteOpen(true); }}
                                >
                                  <FaTrash size={12} />
                                </Button>
                              </>
                            )}

                            {/* ALWAYS AVAILABLE: View Details Button */}
                            <Link href={`/requests/${req._id}`}>
                              <Button
                                as={Link}

                                isIconOnly
                                size="sm"
                                radius="md"
                                className="h-8 w-8 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                              >
                                <FaEye size={12} />
                              </Button>
                            </Link>

                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableContent>
            </Table>
          </div>
        </Card>
      </div>

      {/* Keep Modals mounted globally */}
      <EditRequestModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingRequest={editingRequest}
      />
      <DeleteRequestModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        id={deletedId}
      />

      {/* Pagination Container */}
      <div className='pt-5'>
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={page === 1}>
                  <Link className='flex gap-2' href={`/dashboard/donor/my-request?page=${page - 1}`}>
                    <Pagination.PreviousIcon />
                    Prev
                  </Link>
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Link href={`/dashboard/donor/my-request?page=${p}`}>
                    <Pagination.Link className={`${p === page && 'bg-red-800 text-white'}`} isActive={p === page}>
                      {p}
                    </Pagination.Link>
                  </Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next isDisabled={page === totalPages}>
                  <Link className='flex gap-2' href={`/dashboard/donor/my-request?page=${page + 1}`}>
                    Next
                    <Pagination.NextIcon />
                  </Link>
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </div>
    </div>
  );
};

export default RequestTable;