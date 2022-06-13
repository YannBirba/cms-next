import { type CombinedError } from "urql";

export type QueryResult<Object> = {
  data?: Object;
  error?: CombinedError | undefined;
  fetching: boolean;
};
