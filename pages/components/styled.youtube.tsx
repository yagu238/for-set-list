import React, { useState } from "react";
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Button, Card, CardHeader, CardMedia } from "@mui/material";
import YouTube from "react-youtube";
import style from "../../styles/Youtube.module.css";
import { SongListType } from "./songs";

export const StyledYoutube: React.FC<SongListType> = ({
  createBy,
  title,
  songBy,
  videoId,
}) => {
  const [playFlg, setPlayFlg] = useState(true);

  return (
    <Card>
      <CardHeader
        action={
          !playFlg && <Button
            variant="outlined"
            color="inherit"
            startIcon={
              <PlayCircleFilledOutlined fontSize="inherit" color="warning" />
            }
            onClick={() => setPlayFlg(true)}
          >
            再生する
          </Button>
        }
        subheader={title + "/" + songBy}
      />
      {!playFlg && (
        <CardMedia
          component="img"
          height="194"
          image={"https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"}
          alt="Paella dish"
        />
      )}
      {playFlg && (
        <YouTube
          videoId={videoId}
          className={style.youtube}
          iframeClassName={style.iframe}
          // onReady={(event) => {
          //   const embedCode = event.target.getVideoEmbedCode();
          //   event.target.playVideo();
          //   const ele = document.getElementById('embed-code');
          //   if (ele) ele.innerHTML = embedCode;
          // }}
        />
      )}
    </Card>
  );
};
