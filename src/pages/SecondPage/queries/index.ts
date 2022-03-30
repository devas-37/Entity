import { gql } from "@apollo/client";

export const NAMES = gql`
  query {
    countries {
      name
      code
    }
  }
`;
