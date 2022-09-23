import {
  Box,
  List,
  ListItem,
  ListItemText,
  Rating as RatingMui,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SaveAs } from "@mui/icons-material";
import type { Liff } from "@line/liff";
import {
  deco27List,
  jinList,
  lastNoteList,
  mikitoList,
  mp40List,
  nenuList,
  reruririList,
  honeyWorksList,
  suriList,
  otherList,
} from "./components/songs";
import axios from "axios";
import { RatingDto } from "./types/rating.dto";
import { RatingContent } from "./types/rating.content";
import { useEffect, useState } from "react";
import { UserInfo } from "./types/user-info.content";

type RatingProps = {
  liff: Liff | null;
  liffError: string | null;
};

const Rating = ({ liff, liffError }: RatingProps) => {
  const defaultList = [
    ...mikitoList,
    ...jinList,
    ...mp40List,
    ...nenuList,
    ...deco27List,
    ...honeyWorksList,
    ...suriList,
    ...lastNoteList,
    ...reruririList,
    ...otherList,
  ];

  const [contents, setContents] = useState<RatingContent[]>([]);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!liff) return;

    axios
      .get<UserInfo>("api/ratings", {
        params: {
          userId: liff.getIDToken() ?? "dummy"
        }
      })
      .then((res) => {
        const info = res.data;
        setSaved(info.isSaved);

        const defList = defaultList.map((song) => {
          return {
            videoId: song.videoId,
            rating: song.rating,
            title: song.title,
            songBy: song.songBy,
          };
        });
        setContents(defList);
      })
      .catch((e) => {});
  }, [liff]);

  const [loading, setLoading] = useState(false);

  const onChangeRating = (videoId: string, newValue: number) => {
    const index = contents.findIndex((song) => song.videoId === videoId);
    contents[index].rating = newValue;
    setContents(contents);
  };

  const handleClick = async () => {
    setLoading(true);
    const dto: RatingDto = {
      user_id: liff ? liff.getIDToken() ?? "dummy" : "notliff",
      contents: contents,
    };
    const res = await axios.post("api/create-ratings", dto).catch((e) => {
      setLoading(false);
    });
    setLoading(false);
    setSaved(true);
  };

  return (
    <>
      <List>
        {!saved && contents.map((song) => (
          <ListItem disablePadding key={song.videoId}>
            <ListItemText
              sx={{ px: 1 }}
              primary={song.title + "/" + song.songBy}
            />
            <RatingMui
              defaultValue={song.rating}
              precision={1}
              onChange={(event, newValue) =>
                onChangeRating(song.videoId, newValue ?? song.rating)
              }
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 1 }}>
        {!saved && contents.length > 0 && (
          <LoadingButton
            color="primary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveAs />}
            variant="contained"
            size="large"
            fullWidth
          >
            Save
          </LoadingButton>
        )}
        {/* {contents.length === 0 && <p>コンテンツの取得に失敗しました。</p>} */}
        {saved && <p>回答ありがとうございます。</p>}
      </Box>
    </>
  );
};

export default Rating;
