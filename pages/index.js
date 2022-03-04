import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Spa from "./spa";

export default function Home() {
  return (
      <div style={{paddingBottom: 100}}>
        <Box>
          <AppBar position="static" style={{background: "black"}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                SPA
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Spa/>
      </div>
  )
}
