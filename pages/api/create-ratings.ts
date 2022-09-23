// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "./client.cms";

type CmsRatingContent = {
  user_id: string;
  details: {
    fieldId: "details";
    video_id: string;
    rating: number;
  }[];
};

type RatingDto = {
  user_id: string;
  contents: {
    videoId: string;
    rating: number;
    title: string;
    songBy: string;
  }[];
};

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
