// 'use client'
// import React from 'react';
// import { Pagination } from '@heroui/react';

// const CustomPagination = ({
//   totalItems,
//   itemsPerPage = 3,
//   currentPage,
//   onPageChange,
//   color = "danger"
// }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

//   // Calculate the item numbers currently being displayed
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   if (totalItems === 0) return null;

//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-2 w-full">
//       <span className="text-sm text-slate-500">
//         Showing <b>{startItem}</b>-<b>{endItem}</b> of {totalItems} results
//       </span>
//       <Pagination
//         total={totalPages}
//         page={currentPage}
//         onChange={onPageChange}
//         color={color}
//         variant="flat"
//         showControls
//       />
//     </div>
//   );
// };

// export default CustomPagination;