import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import Form from "./form";
import { OverlayPanel } from "primereact/overlaypanel";
import { useState, useRef, SetStateAction, Dispatch } from "react";
import { apiKeys } from "../services/api";

type columProps = {
  field: string;
  pages: string;
  data: apiKeys[] | undefined;
  selectedCategories: number[];
  setPag: Dispatch<SetStateAction<number>>;
  setSelectedCategories: Dispatch<SetStateAction<number[]>>;
};

const Columns = ({
  pages,
  data,
  setPag,
  selectedCategories,
  setSelectedCategories,
}: columProps) => {
  const [toggle, settoggle] = useState(true);
  const op = useRef<OverlayPanel>(null);

  const checkBoxMain = (e: CheckboxChangeEvent) => {
    const id = parseInt(e.target.id);
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }

    e.checked &&
      data?.map((value) => {
        !selectedCategories.includes(value.id) &&
          setSelectedCategories((prev) => [...prev, value.id]);
      });
    e.checked === false &&
      data?.map((value) => {
        setSelectedCategories((prev) =>
          prev.filter((item) => item !== value.id)
        );
      });
  };

  return (
    <div className="flex justify-center">
      <Checkbox
        onChange={checkBoxMain}
        checked={selectedCategories.some((item) => item === parseInt(pages))}
        id={pages}
      ></Checkbox>
      <Button
        icon={`pi pi-angle-${toggle ? "up" : "down"}`}
        aria-label="Filter"
        onClick={(e) => {
          op.current?.toggle(e);
          settoggle((prev) => !prev);
        }}
        text
        className="ml-2 h-5 w-[1.3rem]"
      />
      <Form
        op={op}
        setPag={setPag}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};

export default Columns;
