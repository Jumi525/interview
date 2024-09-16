import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { datakeys, apiKeys } from "./api";

const FetchHooks = (pages: string) => {
  const fetchData = () =>
    axios
      .get<datakeys>(`https://api.artic.edu/api/v1/artworks?page=${pages}`)
      .then((res) => res.data.data);

  return useQuery<apiKeys[], Error>({
    queryKey: [pages, "data"],
    queryFn: fetchData,
  });
};

export default FetchHooks;
