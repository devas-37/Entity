import { useEffect, useState } from "react";
import { API_URI } from "../../../constans";
import { IPosition, IRelation, IState } from "../../../Interfaces";

export const usePositionQuery = (filter: string = "") => {
  const [positionsResult, setPositions] = useState<IPosition[]>([]);
  const [state, setState] = useState<IState>({
    loading: false,
    error: false,
    success: false,
  });
  filter = filter ? `(${filter})` : "";
  const fieldName = `applicantIndividualCompanyPositions${filter}`;
  useEffect(() => {
    setState((old) => ({ ...old, loading: true }));
    fetch(API_URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        {
          ${fieldName} {
            data {
              id
              name
            }
          }
        }
      `,
        variables: `{}`,
      }),
    }).then((res) => {
      setState((old) => ({ ...old, loading: false }));
      return res.json().then((res) => setPositions(res.data[fieldName].data));
    });
  }, []);
  return [positionsResult, state];
};
export const useRelationQuery = (filter: string = "") => {
  const [relationsResult, setRelations] = useState<IRelation[]>([]);
  const [relState, setRelState] = useState<IState>({
    loading: false,
    error: false,
    success: false,
  });
  filter = filter ? `(${filter})` : "";
  const fieldName = `applicantIndividualCompanyRelations${filter}`;
  useEffect(() => {
    setRelState((old) => ({ ...old, loading: true }));
    fetch(API_URI, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          ${fieldName} {
            data {
              id
              name
            }
          }
        }
      `,
        variables: `{}`,
      }),
    }).then((res) => {
      setRelState((old) => ({ ...old, loading: false }));
      return res.json().then((res) => setRelations(res.data[fieldName].data));
    });
  }, []);
  return [relationsResult, relState];
};
