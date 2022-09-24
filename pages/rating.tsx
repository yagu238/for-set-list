import {
  Box,
  List,
  ListItem,
  ListItemText,
  Rating as RatingMui,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SaveAs } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageProps } from "./_app";
import getSongList from "../data/song-list";

type RatingContent = {
  videoId: string;
  rating: number;
  title: string;
  songBy: string;
};

type RatingDto = {
  user_id: string;
  contents: RatingContent[];
};

type UserInfo = {
  userId: string;
  isSaved: boolean;
};

const Rating = ({ liff, liffError }: PageProps) => {
  const defaultList = getSongList();

  const [contents, setContents] = useState<RatingContent[]>([]);
  const [saved, setSaved] = useState<boolean>(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!liff) return;
    if (!liff.isLoggedIn()) return;
    liff.getProfile().then((value) => {
      setUserId(value.userId);
    });
  }, [liff]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get<UserInfo>("api/ratings", { params: { userId } })
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
  }, [userId]);

  const [loading, setLoading] = useState(false);

  const onChangeRating = (videoId: string, newValue: number) => {
    const index = contents.findIndex((song) => song.videoId === videoId);
    contents[index].rating = newValue;
    setContents(contents);
  };

  const handleClick = async () => {
    setLoading(true);
    const dto: RatingDto = {
      user_id: userId,
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
        {!saved &&
          contents.map((song) => (
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
