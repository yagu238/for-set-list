import { List } from "@mui/material";
import getSongList from "../data/song-list";
import StyledYoutube from "./components/styled.youtube";

const Songs = () => {
  const list = getSongList();

  return (
    <>
      <List>
        {list.map((song) => (
          <StyledYoutube
            key={song.videoId}
            createBy={song.createBy}
            title={song.title}
            songBy={song.songBy}
            videoId={song.videoId}
            rating={song.rating}
          ></StyledYoutube>
        ))}
      </List>
    </>
  );
};

export default Songs;
