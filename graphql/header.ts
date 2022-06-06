import { gql } from "urql";

const getHeader = gql`
  query getHeader($id: ID!) {
    header_by_id(id: $id) {
      id
      status
      header_level
      text
      css_class
    }
  }
`;

const getAllHeaders = gql`
  query getAllHeaders {
    header {
      id
      status
      header_level
      text
      css_class
    }
  }
`;

export { getHeader, getAllHeaders };
