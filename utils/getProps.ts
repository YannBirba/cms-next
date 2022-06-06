import type { OperationResult, TypedDocumentNode } from "urql";
import { client } from "../lib/graphql";

export const getProps = async (query : TypedDocumentNode<any, object>, params: {}): Promise<OperationResult<any, {}>> => {
  return await client.query(query, params).toPromise();
};