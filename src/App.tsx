import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useState } from "react";
import PaginatedButton from "./component/button";
import Table from "./component/table";

const App = () => {
  const [page, setPage] = useState(1);
  const newPage = page.toString();

  return (
    <section>
      <Table pages={newPage} />
      <PaginatedButton setpage={(value) => setPage(value)} />
    </section>
  );
};

export default App;
