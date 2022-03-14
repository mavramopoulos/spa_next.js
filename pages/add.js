import {useSession} from "next-auth/react";
import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {useEffect, useState} from "react";
import {Router, useRouter} from "next/router";

export default function Add() {
    const router = useRouter()
    const {data: session} = useSession()
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [isActive, setIsActive] = useState("")
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (session) {

        } else {
            router.push('/')
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employee = {
            last_name: lastName,
            first_name: firstName,
            is_active: isActive,
            date_of_birth: date
        };

        await fetch("/api/insert",
            {
                method: 'POST',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                setLastName("")
                setFirstName("")
                setIsActive("")
                setDate(new Date())
                return res;
            })
    }

    return (
        <div style={{marginTop: 100, paddingRight: 100, paddingLeft: 100}}>
            <h1>Add New Employee</h1>
            <Box
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <TextField
                            required
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <Select style={{width: 300, marginTop: 8}}
                                required
                                id="is_active"
                                label="Is Active"
                                name="is_active"
                                defaultValue=""
                                value={isActive}
                                onChange={e => setIsActive(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="True">Yes</MenuItem>
                            <MenuItem value="False">No</MenuItem>
                        </Select>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                required
                                id="date_of_birth"
                                label="Date"
                                name="date_of_birth"
                                value={date}
                                onChange={newValue => setDate(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                date={null}
                                inputFormat="dd/MM/yyyy"
                            />
                        </LocalizationProvider>
                    </div>
                    <Button style={{marginLeft: 10}} variant="contained" type="submit">Submit</Button>
                </form>
            </Box>
        </div>
    )
}