import { List } from "@mui/material";
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
import { StyledYoutube } from "./components/styled.youtube";

const Songs = () => {
  const list = [
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
