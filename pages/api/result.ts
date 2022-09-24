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

type RatingRsultSummary = {
  videoId: string;
  score: number;
};

type RatingResult = {
  raterCount: number;
  summary: RatingRsultSummary[];
};

const orgFloor = (value: number, base: number) => {
  return Math.floor(value * base) / base;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RatingResult>
) {
  const result = await client.getList<CmsRatingContent>({
    endpoint: "rating",
  });

  const flatDetails = result.contents.flatMap(content => content.details);
  const summaryMap = new Map<string, number>();
  for (const detail of flatDetails) {
    if (summaryMap.has(detail.video_id)) {
      let crntValue = summaryMap.get(detail.video_id)!;
      summaryMap.set(detail.video_id, crntValue + detail.rating);
    } else {
      summaryMap.set(detail.video_id, detail.rating);
    }
  }

  let summary: RatingRsultSummary[] = [];
  summaryMap.forEach((value, key) => {
    summary.push({ videoId: key, score: orgFloor(value / result.totalCount, 10) });
  })

  summary.sort((a, b) => b.score - a.score);

  res.status(200).json({
    raterCount: result.totalCount,
    summary: summary,
  });
}
