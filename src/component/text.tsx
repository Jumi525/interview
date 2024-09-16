// import React, { useState, useRef, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
// import { Button } from "primereact/button";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { InputText } from "primereact/inputtext";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { datakeys, apiKeys } from "../services/api";

// type TableProps = {
//   pages: string;
// };

// const Table = ({ pages }: TableProps) => {
//   const bookmarkedLocal = JSON.parse(
//     localStorage.getItem("bookmarkedIds") || "[]"
//   );

//   const [checked, setChecked] = useState(true);
//   const [toggle, settoggle] = useState(true);
//   const op = useRef(null);
//   const [value, setValue] = useState("");
//   const [pag, setPag] = useState(0);
//   const [selectedCategories, setSelectedCategories] =
//     useState<number[]>(bookmarkedLocal);

//   const fetchData = () =>
//     axios
//       .get<datakeys>(`https://api.artic.edu/api/v1/artworks?page=${pages}`)
//       .then((res) => res.data.data);

//   const { data, error, isLoading } = useQuery<apiKeys[], Error>({
//     queryKey: [pages, "data"],
//     queryFn: fetchData,
//   });

//   useEffect(() => {
//     if (pag > 12) {
//       const pagRem = Math.ceil(pag % 12);
//       const pageses = Math.ceil(pag / 12);
//       console.log("pageses", pageses);
//       console.log("pagRem", pagRem);
//       console.log("pages", pages);
//       if (pageses === parseInt(pages)) {
//         data?.map((val, index) => {
//           index < pagRem && setSelectedCategories((prev) => [...prev, val.id]);
//         });
//       } else if (parseInt(pages) <= pageses) {
//         console.log("remaining");
//         data?.map((val) => setSelectedCategories((prev) => [...prev, val.id]));
//       }
//     } else if (pag <= 12 && pag >= 1) {
//       console.log("bellow 12");
//       data?.map((val, index) => {
//         index + 1 <= pag && setSelectedCategories((prev) => [...prev, val.id]);
//       });
//     }
//   }, [data, pages, pag]);

//   const onCategoryChange = (e: CheckboxChangeEvent) => {
//     const id = parseInt(e.target.id);
//     if (selectedCategories.includes(id)) {
//       setSelectedCategories((prev) => prev.filter((item) => item !== id));
//     } else {
//       setSelectedCategories((prev) => [...prev, id]);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("bookmarkedIds", JSON.stringify(selectedCategories));
//   }, [selectedCategories]);

//   const noo = data?.map((value) => ({
//     no: (
//       <Checkbox
//         onChange={onCategoryChange}
//         checked={selectedCategories.some((item) => item === value.id)}
//         id={value.id.toString()}
//         value={value.id.toString()}
//       ></Checkbox>
//     ),
//     ...value,
//   }));

//   const checkBoxMain = (e: CheckboxChangeEvent) => {
//     const id = parseInt(e.target.id);
//     data?.map((value) => console.log(value.id));
//     if (selectedCategories.includes(id)) {
//       setSelectedCategories((prev) => prev.filter((item) => item !== id));
//     } else {
//       setSelectedCategories((prev) => [...prev, id]);
//     }

//     e.checked &&
//       data?.map((value) => {
//         !selectedCategories.includes(value.id) &&
//           setSelectedCategories((prev) => [...prev, value.id]);
//       });
//     e.checked === false &&
//       data?.map((value) => {
//         setSelectedCategories((prev) =>
//           prev.filter((item) => item !== value.id)
//         );
//       });
//   };

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     console.log(e.target);
//     setSelectedCategories((prev) => prev.filter((item) => item !== item));
//     // selectedCategories.map((value) => {
//     //   setSelectedCategories((prev) => prev.filter((item) => item !== value));
//     // });
//   };

//   const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const pageValue = e.target[0].value;
//     setPag(parseInt(pageValue));
//     console.log(parseInt(pageValue));
//   };

//   const handlesClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     console.log("sumbit");
//   };

//   return (
//     <div className="card">
//       <DataTable value={noo} showGridlines tableStyle={{ minWidth: "6rem" }}>
//         <Column
//           field="no"
//           className="bg-red-400"
//           header={
//             <div className="flex justify-center">
//               <Checkbox
//                 onChange={checkBoxMain}
//                 checked={selectedCategories.some(
//                   (item) => item === parseInt(pages)
//                 )}
//                 id={pages}
//               ></Checkbox>
//               <Button
//                 icon={`pi pi-angle-${toggle ? "up" : "down"}`}
//                 aria-label="Filter"
//                 onClick={(e) => {
//                   op.current.toggle(e);
//                   settoggle((prev) => !prev);
//                 }}
//                 text
//                 className="ml-2 h-5 w-[1.3rem]"
//               />
//               <OverlayPanel ref={op}>
//                 <form className="flex flex-col " onSubmit={submitForm}>
//                   <InputText
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     placeholder="No of rows"
//                     className="rounded-md"
//                   />
//                   <div className="mt-2 max-w-max mx-auto flex gap-2">
//                     <Button
//                       rounded
//                       label="Submit"
//                       outlined
//                       onClick={handlesClick}
//                     />
//                     <Button
//                       rounded
//                       label="Undo"
//                       outlined
//                       onClick={handleClick}
//                     />
//                   </div>
//                 </form>
//               </OverlayPanel>
//             </div>
//           }
//         ></Column>
//         <Column field="title" header="title"></Column>
//         <Column field="inscriptions" header="inscriptions"></Column>
//         <Column field="artist_display" header="artist_display"></Column>
//         <Column field="place_of_origin" header="place_of_origin"></Column>
//         <Column field="date_start" header="date_start"></Column>
//         <Column field="date_end" header="date_end"></Column>
//       </DataTable>
//     </div>
//   );
// };

// export default Table;

// useEffect(() => {
//   axios
//     .get<datakeys>(`https://api.artic.edu/api/v1/artworks?page=${pages}`)
//     .then((res) => setdata(res.data.data));
// }, [pages]);

// useEffect(fetchData, [pages]);

// const pageValue = e.target[0].value;
//     // const pageses = Math.ceil(parseInt(pageValue) / parseInt(pages));
//     setPag(pageValue);
// if (pageValue > 12) {
//   const pagRem = Math.ceil(parseInt(pageValue) % 12);
//   const pageses = Math.ceil(parseInt(pageValue) / 12);
//   // const newPage = pageValue - 12;
//   console.log(pageses);
//   console.log(pagRem);
//   if (pageses === parseInt(pages)) {
//     for (let i = 0; i > pagRem; i++) {
//       console.log(console.log("hello"));
//     }
//   } else {
//     data?.map((value) => console.log(value.id));
//   }
