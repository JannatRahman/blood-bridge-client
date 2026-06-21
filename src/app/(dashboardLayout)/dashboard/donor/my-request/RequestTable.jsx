'use client'
import DeleteRequestModal from '@/components/DeleteRequestModal';
import EditRequestModal from '@/components/EditRequestModal';
import { Button, Card, Chip, Table, TableBody, TableCell, TableColumn, TableContent, TableHeader, TableRow } from '@heroui/react';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RequestTable = ({request}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(null)
  const [editingRequest, setEditingRequest] = useState(null);
  return (
    <div>
      <div className="mt-6">
        <Card className="border border-white bg-red-800 backdrop-blur-xl shadow-2xl p-6 ">
          <div className="p-0 overflow-x-auto">

            <Table aria-label="My Blood Requests" >
              <TableContent>
                <TableHeader className="bg-white border-b  rounded-t-xl">
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100" isRowHeader>Recipient</TableColumn>
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">Location</TableColumn>
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">DATE</TableColumn>
                  {/* <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">TICKET PRICE</TableColumn> */}
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">Need</TableColumn>
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">STATUS</TableColumn>
                  <TableColumn className="py-4 px-6 text-Black font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-red-100">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={<p className="text-slate-900 py-10 text-center font-medium">You haven not added any events yet.</p>}>
                  {request?.map((req) => (
                    <TableRow key={req._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                      <TableCell className="py-4 px-6 align-middle font-bold text-black"><span className="line-clamp-1 truncate max-w-[150px]">{req.
                        recipientName}</span></TableCell>
                      <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.recipientDistrict}</TableCell>
                      <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.
                        donationDate}</TableCell>
                      {/* <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">${ev.price?.toFixed(2)}</TableCell> */}
                      <TableCell className="py-4 px-6 align-middle text-black font-medium">{req.
                        bloodGroup} </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <Chip
                          size="sm"
                          className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${req.status === "Progress"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : req.status === "Inprogress"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }`}
                        >
                          {req.status || "Inprogress"}
                        </Chip>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <div className="flex gap-2">
                          <div className="group relative flex items-center justify-center w-fit">
                            <Button isIconOnly size="sm" radius="full" className="h-8 w-8 min-w-0 p-0 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-[1.03] transition-all duration-200" onPress={() => { setEditingRequest({ ...req }); setIsModalOpen(true); }}><FaEdit size={12} /></Button>
                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">Edit Request</span>
                          </div>
                          <div className="group relative flex items-center justify-center w-fit">
                            <Button isIconOnly size="sm" radius="full" className="h-8 w-8 min-w-0 p-0 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.03] transition-all duration-200" onPress={() => {
                              setDeletedId(req._id)
                              setIsDeleteOpen(true)
                            }}><FaTrash className='text-red-700' size={12} /></Button>
                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">Delete Request</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContent>
            </Table>

          </div>
        </Card>
      </div>
      <EditRequestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingRequest={editingRequest} />
      <DeleteRequestModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} id={deletedId} />
    </div>
  );
};

export default RequestTable;