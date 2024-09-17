import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState, useRef, RefObject } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

type formProps = {
  op: RefObject<OverlayPanel>;
  setPag: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
};

const Form = ({ setPag, setSelectedCategories, op }: formProps) => {
  const inpuform = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.bubbles = false;
    const ne = inpuform.current?.ariaValueMax || "0";
    setPag(parseInt(ne));
    setValue("");
    op.current?.toggle(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== item));
    e.stopPropagation();
  };

  return (
    <OverlayPanel ref={op}>
      <form
        className="flex flex-col "
        ref={inpuform}
        onSubmit={submitForm}
        aria-valuemax={parseInt(value)}
      >
        <InputText
          value={value}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.bubbles = false;
            setValue(e.target.value);
          }}
          placeholder="No of rows"
          className="rounded-md"
        />
        <div className="mt-2 max-w-max mx-auto flex gap-2">
          <Button
            rounded
            label="Submit"
            outlined
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              e.bubbles = false;
            }}
          />
          <Button rounded label="Undo" outlined onClick={handleClick} />
        </div>
      </form>
    </OverlayPanel>
  );
};

export default Form;
