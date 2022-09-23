import { RatingContent } from "./rating.content";

export type RatingDto = {
  user_id: string;
  contents: RatingContent[];
};