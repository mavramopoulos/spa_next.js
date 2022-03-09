import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import Spa from "./spa";
import {useSession, signIn, signOut} from "next-auth/react"

export default function Home() {
    const {data: session} = useSession()
    if (session) {
        return (
            <div style={{paddingBottom: 100}}>
                <Box>
                    <AppBar position="static" style={{background: "black"}}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                SPA
                            </Typography>
                            Signed in as {session.user.email} <br/>
                            <Button style={{marginLeft: 10}} variant="contained" onClick={() => signOut()}>Sign out</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Spa/>
            </div>
        )
    } else {
        return (
            <div align="center">
                <h1>You are not Signed in!</h1>
                <Button variant="contained" onClick={() => signIn()}>Sign in</Button>
            </div>
        )
    }
}
