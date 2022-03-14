import {Button, Card, CardActions, CardContent, Container, Grid} from "@mui/material";
import {useSession} from "next-auth/react"
import SignIn from "./signIn";
import Link from 'next/link'
import {Link as MUILink} from '@mui/material';

export default function Home() {
    const {data: session} = useSession()
    if (session) {
        return (
            <div align="center">
                <Card variant="outlined" sx={{width: 400}}>
                    <CardContent>
                        <h1 align="center">Select</h1>
                        <CardActions>
                            <Link href="/spa">
                                <MUILink component="button">
                                    <Button style={{marginLeft: 70}} variant="contained">
                                        View
                                    </Button>
                                </MUILink>
                            </Link>
                            <Link href="/add">
                                <MUILink component="button">
                                    <Button style={{marginLeft: 60}} variant="contained">
                                        Add
                                    </Button>
                                </MUILink>
                            </Link>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        )
    } else {
        return (
            <SignIn/>
        )
    }
}
