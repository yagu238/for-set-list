// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from './client.cms'

type CmsRatingContent = {
  user_id: string;
  details: {
    fieldId: "details";
    video_id: string;
    rating: number;
  }[];
};

type UserInfo = {
  userId: string;
  isSaved: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo>
) {
  const { userId } = req.query;
  if (typeof userId === "string") {
    const result = await client.getList<CmsRatingContent>({
      endpoint: "rating",
    });
    const contents = result.contents.filter(c => c.user_id === userId);
    res.status(200).json({
      userId: userId,
      isSaved: contents.length > 0,
    });
  }
}
