// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CmsRatingContent } from "../types/cms-rating.content";
import { RatingDto } from "../types/rating.dto";
import { client } from "./client.cms";

type CreateRatingData = {
  isSuccess: boolean;
  createdCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateRatingData>
) {
  if (req.method === "POST") {
    const dto = req.body as RatingDto;
    const result = await client.create<CmsRatingContent>({
      endpoint: "rating",
      content: {
        user_id: dto.user_id,
        details: dto.contents.map((c) => {
          return { 
            fieldId: "details", 
            video_id: c.videoId,
            rating: c.rating,
          };
        }),
      },
    });
    res.status(200).json({
      isSuccess: true,
      createdCount: dto.contents.length,
    });
  }
}
