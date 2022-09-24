import {
  List,
  ListItem,
  ListItemText,
  Rating as RatingMui,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import getSongList from "../data/song-list";
import { PageProps } from "./_app";

type RatingRsultSummary = {
  videoId: string;
  score: number;
};

type RatingResult = {
  raterCount: number;
  summary: RatingRsultSummary[];
};

const getVideoTitleAndSongBy = (videoId: string) => {
  const songList = getSongList();
  const song = songList.filter((song) => song.videoId === videoId)[0];
  return song.title + "/" + song.songBy;
};

const Result = ({ liff, liffError }: PageProps) => {
  const [resultContent, setResultContent] = useState<RatingResult | null>(null);

  useEffect(() => {
    axios
      .get<RatingResult>("api/result")
      .then((res) => {
        setResultContent(res.data);
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      {resultContent && (
        <>
          <p>回答者数: {resultContent.raterCount}</p>
          <List>
            {resultContent.summary.map((value, index) => (
              <ListItem disablePadding key={value.videoId}>
                <ListItemText sx={{ px: 1 }} primary={ index + 1 + ". " + getVideoTitleAndSongBy(value.videoId)} />
                <RatingMui
                  defaultValue={value.score}
                  precision={0.1}
                  size="small"
                  readOnly
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default Result;
