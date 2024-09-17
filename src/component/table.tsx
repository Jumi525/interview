import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import FetchHooks from "../services/queries";
import Columns from "./headers";

const PAGES = 12;

type TableProps = {
  pages: string;
};

const Table = ({ pages }: TableProps) => {
  const { data, error, isLoading } = FetchHooks(pages);
  const bookmarkedLocal = JSON.parse(
    localStorage.getItem("bookmarkedIds") || "[]"
  );
  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(bookmarkedLocal);
  const [pag, setPag] = useState(0);

  useEffect(() => {
    if (pag > PAGES) {
      const pagRem = Math.ceil(pag % PAGES);
      const pageses = Math.ceil(pag / PAGES);
      if (pageses === parseInt(pages)) {
        data?.map((val, index) => {
          index < pagRem && setSelectedCategories((prev) => [...prev, val.id]);
        });
      } else if (parseInt(pages) <= pageses) {
        data?.map((val) => setSelectedCategories((prev) => [...prev, val.id]));
      }
    } else if (pag <= PAGES && pag >= 1 && pages === "1") {
      data?.map((val, index) => {
        index + 1 <= pag && setSelectedCategories((prev) => [...prev, val.id]);
      });
    }
  }, [pages, pag, data]);

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    const id = parseInt(e.target.id);
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  const TableData = data?.map((value) => ({
    CheckIcon: (
      <Checkbox
        onChange={onCategoryChange}
        checked={selectedCategories.some((item) => item === value.id)}
        id={value.id.toString()}
        value={value.id.toString()}
      ></Checkbox>
    ),
    ...value,
  }));

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  if (isLoading)
    return (
      <div className="grid place-content-center text-blue-500 my-5">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="grid place-content-center text-red-700 my-5">
        {error.message}
      </div>
    );
  return (
    <div className="card">
      <DataTable
        value={TableData}
        showGridlines
        tableStyle={{ minWidth: "6rem" }}
      >
        <Column
          field="CheckIcon"
          className="bg-red-400"
          header={
            <Columns
              field="no"
              setPag={setPag}
              pages={pages}
              data={data}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          }
        ></Column>
        <Column field="title" header="Title"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="artist_display" header="Artist Display"></Column>
        <Column field="place_of_origin" header="Place Of Origin"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="date End"></Column>
      </DataTable>
    </div>
  );
};

export default Table;
