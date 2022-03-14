import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Header() {
    const {data: session} = useSession()
    const router = useRouter()
    const navigateHome = () => router.push('/')

    if (session) {
        return (
            <div style={{paddingBottom: 100}}>
                <Box>
                    <AppBar position="static" style={{background: "black"}}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                <Link href="/">
                                    <a>SPA</a>
                                </Link>
                            </Typography>
                            Signed in as {session.user.email} <br/>
                            <Button style={{marginLeft: 10}} variant="contained" onClick={() => {navigateHome().then(signOut());}}>Sign
                                out</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        )
    }else{
        return (
            <div style={{paddingBottom: 100}}>
                <Box>
                    <AppBar position="static" style={{background: "black"}}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                SPA
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        )
    }
}