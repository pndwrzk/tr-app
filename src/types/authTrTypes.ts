import { APIResponseInfo } from "@/types/globalTypes";

export type loginRespone = APIResponseInfo & {
  data: dataToken | null;
};

export type loginRequestBody = {
  email: string;
  password: string;
};

export type registerRequestBody = {
  email: string;
  password: string;
  name: string;
};

type dataToken = {
  access_token: string;
  refresh_access_token: string;
  access_token_expired: number;
  refresh_access_token_expired: number;
};
