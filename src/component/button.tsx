import { useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

type ButtonProps = {
  setpage: (pages: number) => void;
};

const PaginatedButton = ({ setpage }: ButtonProps) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setpage(event.page + 1);
  };

  return (
    <>
      <Paginator
        className="border-2 my-5 border-solid border-red-500 rounded-full max-w-max mx-auto"
        first={first}
        rows={rows}
        totalRecords={120}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default PaginatedButton;
