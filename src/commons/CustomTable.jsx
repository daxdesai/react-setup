import React from "react";
import DataNotFound from "./DataNotFound";
import Pagination from "./Pagination";
import RippleLoader from "./RippleLoader";
import TableShowLimit from "./TableShowLimit";

const CustomTable = ({
  columnHeaders,
  dataRows,
  data,
  loading,
  paginationCurrentLimit,
  setPaginationCurrentLimit,
  total,
  current,
  paginationData,
  showPagination
}) => {
  return (
    <>
      <div className="w-full rounded-lg">
        {loading ? (
          <>
            <RippleLoader />
          </>
        ) : (
          <>
            {data?.data?.length > 0 ? (
              <>
                <div className="bg-white lg:overflow-visible overflow-x-auto drop-hasdow-[0px_1px_6px_rgba(0,0,0,0.1)]">
                  <table className="w-full text-sm lg:overflow-visible overflow-x-auto min-w-[400px] custom-scroll">
                    {/* column headers */}
                    <thead className="text-sm text-gray-700 bg-lightPrimaryShades font-semibold ">
                      <tr>{columnHeaders}</tr>
                    </thead>

                    {/* table body */}
                    <tbody className="relative">{dataRows}</tbody>
                  </table>
                </div>
                {/* Pagination  */}
                {showPagination && (
                <div className="flex flex-wrap items-center justify-end my-2">
                  <TableShowLimit
                    paginationCurrentLimit={paginationCurrentLimit}
                    setPaginationCurrentLimit={setPaginationCurrentLimit}
                  />
                  <p className="text-xs"> {(data?.current_page - 1) * data?.per_page + 1} - {(data?.current_page - 1) * data?.per_page + data?.data?.length } of {total}</p>
                  <div className="px-4 py-2 rounded-lg">
                    <Pagination
                      total={total}
                      current={current}
                      pagination={paginationData}
                    />
                  </div>
                </div>
                )}
              </>
            ) : (
              <>
                <DataNotFound />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CustomTable;
