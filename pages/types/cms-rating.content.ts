export type CmsRatingContent = {
  user_id: string;
  details: {
    fieldId: "details";
    video_id: string;
    rating: number;
  }[];
};
