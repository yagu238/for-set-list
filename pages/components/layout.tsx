import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { ReactElement } from "react";
import NextLink from "next/link";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <NextLink href="/songs" passHref>
            <Button color="inherit" variant="outlined">
              Songs
            </Button>
          </NextLink>
          <NextLink href="/rating" passHref>
            <Button sx={{ mx: 1 }} color="inherit" variant="outlined">
              Rating
            </Button>
          </NextLink>
        </Toolbar>
      </AppBar>
    </Box>
    <main>{children}</main>
  </>
);

export default Layout;
