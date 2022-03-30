import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { NAMES } from "./queries";
interface ISecondPageProps {
  open: boolean;
}
export const SecondPage: React.FC<ISecondPageProps> = ({ open }) => {
  const [allData, setAllData] = useState<{ code: string; name: string }[]>([]);

  const { loading, error, data } = useQuery(NAMES);
  useEffect(() => {
    setAllData(data.countries);
  }, [data]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <ul>
        {allData.map((data) => {
          return <li>{data.name}</li>;
        })}
      </ul>
    </div>
  );
};
