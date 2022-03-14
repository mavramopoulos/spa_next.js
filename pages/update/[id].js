import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import moment from "moment";


export default function Update() {
    const router = useRouter()
    const {data: session, status} = useSession()
    const [data, setData] = useState([])
    const [lastNameU, setLastNameU] = useState("")
    const [firstNameU, setFirstNameU] = useState("")
    const [isActiveU, setIsActiveU] = useState('')
    const [dateU, setDateU] = useState("")
    const [id, setId] = useState("")
    const [check, setCheck] = useState(false)

    async function Fetch() {
        await fetch("../api/get/" + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setData(data))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const employee = {
            id: id,
            last_name: lastNameU,
            first_name: firstNameU,
            is_active: isActiveU,
            date_of_birth: dateU
        };

        await fetch("../api/update",
            {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                router.push('/view')
                return res;
            })
    }
    useEffect(() => {
        if (router && router.query) {
            setId(router.query.id)
        }
    }, [router]);

    useEffect(() => {
        if (id && status === "authenticated") {
            Fetch()
        }
    }, [id, status]);

    useEffect(() => {

        if (id && status === "authenticated") {
            if (Object.keys(data).length === 1) {
                setLastNameU(data[0].last_name)
                setFirstNameU(data[0].first_name)
                setIsActiveU(data[0].is_active)
                setDateU(moment(data[0].date_of_birth, 'DD/MM/YYYY').format('MM/DD/YYYY'))
                setCheck(true)
            }else{
                router.push('/view')
            }
        }
    }, [data]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/')
        }
    }, [status]);

    const Page = () => {
        return (
            <div style={{marginTop: 100, paddingRight: 100, paddingLeft: 100, display: check ? 'block' : 'none'}}>
                <h1>Update</h1>
                <Box
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <form onSubmit={handleUpdate}>
                        <div>
                            <TextField

                                id="last_nameU"
                                label="Last Name"
                                name="last_nameU"
                                value={lastNameU}
                                onChange={e => setLastNameU(e.target.value)}
                            />
                            <TextField

                                id="first_nameU"
                                label="First Name"
                                name="first_nameU"
                                value={firstNameU}
                                onChange={e => setFirstNameU(e.target.value)}
                            />
                            <Select style={{width: 300, marginTop: 8}}

                                    id="is_activeU"
                                    label="Is Active"
                                    name="is_activeU"
                                    value={isActiveU}
                                    onChange={e => setIsActiveU(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="True">Yes</MenuItem>
                                <MenuItem value="False">No</MenuItem>
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date_of_birthU"
                                    label="Date Of Birth"
                                    name="date_of_birthU"
                                    value={dateU}
                                    date={null}
                                    onChange={newValue => setDateU(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="dd/MM/yyyy"
                                />
                            </LocalizationProvider>
                        </div>
                        <Button style={{marginLeft: 10}} variant="contained" type="submit">Submit</Button>
                        <Button style={{marginLeft: 10, background: "indianred"}} variant="contained"
                                onClick={() => router.push('/view')}>Cancel</Button>
                    </form>
                </Box>
            </div>
        )
    }

    return <Page />

}