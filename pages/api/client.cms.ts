import { createClient, CreateRequest, DeleteRequest, GetListDetailRequest, GetListRequest, GetObjectRequest, GetRequest, MicroCMSListResponse, WriteApiRequestResult } from 'microcms-js-sdk';

export type ClientType = {
  getList: <T_1 = any>({ endpoint, queries, }: GetListRequest) => Promise<MicroCMSListResponse<T_1>>;
  create: <T_4 extends Record<string | number, any>>({ endpoint, contentId, content, isDraft, }: CreateRequest<T_4>) => Promise<WriteApiRequestResult>;
};

export const client: ClientType = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
