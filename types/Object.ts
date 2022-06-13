import { Status } from "./Status";

export interface Object {
    id?: number;
    status?: Status;
    css_class?: string;
    __typename: string;
}