import { Button, Chip } from '@heroui/react';
import React from 'react';
import { FaEllipsisV, FaMapMarkerAlt, FaRegEnvelope, FaRegUser } from 'react-icons/fa';

const AllUsersTable = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className="border border-slate-100 bg-white shadow-xl shadow-slate-100/40 rounded-[2rem] overflow-hidden p-2 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400">

                <th className="py-5 px-6">Participants</th>
                <th className="py-5 px-6">Location</th>
                <th className="py-5 px-6 text-center">Group</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-slate-400 py-16 text-center font-medium text-sm">
                    Loading requests summary...
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req, index) => (
                  <tr key={req._id} className="hover:bg-slate-50/40 transition-colors group">
                    {/* Index Counter */}
                    <td className="py-5 px-6 font-bold text-slate-300 text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    {/* Participant Details */}
                    <td className="py-5 px-6">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                          <FaRegUser className="text-slate-400 text-xs shrink-0" />
                          <span>{req.recipientName || "Anonymous user"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                          <FaRegEnvelope className="text-slate-300 text-xs shrink-0" />
                          <span>{req.email || "no-email@platform.com"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                        <FaMapMarkerAlt className="text-rose-500 text-xs shrink-0" />
                        <span>{req.recipientDistrict}</span>
                      </div>
                    </td>

                    {/* Blood Group Badge */}
                    <td className="py-5 px-6 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-8 rounded-xl text-xs font-black bg-rose-50 text-rose-600 border border-rose-100">
                        {req.bloodGroup}
                      </span>
                    </td>

                    {/* Custom Status Chips matching image_dc7c5b.png colors */}
                    <td className="py-5 px-6 text-center">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-black uppercase text-[9px] tracking-widest px-2 ${req.status?.toLowerCase() === "done"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                          : req.status?.toLowerCase() === "inprogress" || req.status?.toLowerCase() === "pending"
                            ? "bg-blue-50 text-blue-600 border border-blue-200/60"
                            : "bg-rose-50 text-rose-500 border border-rose-200/60"
                          }`}
                      >
                        • {req.status || "Inprogress"}
                      </Chip>
                    </td>

                    {/* Standard Action Button Menu */}
                    <td className="py-5 px-6 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          className="text-slate-400 hover:text-slate-900 min-w-0 h-8 w-8 bg-transparent hover:bg-slate-100 rounded-xl transition-all"
                          onPress={() => { setEditingRequest({ ...req }); setIsModalOpen(true); }}
                        >
                          <FaEllipsisV size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-slate-400 py-16 text-center font-medium text-sm">
                    No donation requests match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsersTable;