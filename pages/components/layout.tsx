import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { ReactElement } from 'react';

type LayoutProps = Required<{
  readonly children: ReactElement
}>;

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Button color="inherit" variant="outlined" href="/songs">Songs</Button>
          <Button sx={{ mx: 1 }} color="inherit" variant="outlined" href="rating">Rating</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <main>{children}</main>
  </>
)