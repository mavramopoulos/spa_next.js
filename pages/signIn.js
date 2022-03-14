import {Button} from "@mui/material";
import {signIn} from "next-auth/react";

export default function SignIn() {
    return (
        <div align="center">
            <h1>You are not Signed in!</h1>
            <Button variant="contained" onClick={() => signIn()}>Sign in</Button>
        </div>
    )
}