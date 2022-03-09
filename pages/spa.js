import {useEffect, useState} from "react";
import {
    Box, Button,
    IconButton, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";

export default function Spa() {
    const [employees, setEmployees] = useState([])
    const [editId, setEditId] = useState([])
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [isActive, setIsActive] = useState("")
    const [date, setDate] = useState(new Date())
    const [lastNameU, setLastNameU] = useState("")
    const [firstNameU, setFirstNameU] = useState("")
    const [isActiveU, setIsActiveU] = useState("")
    const [dateU, setDateU] = useState("")
    async function Fetch() {
        await fetch("/api/select", {method: 'GET', mode: 'cors'})
            .then(res => res.json())
            .then(employees => setEmployees(employees))
    }
    const [show, setShow] = useState(false);

    useEffect(() => {
        Fetch()
            .then()
    }, [])

    function renderUpdate() {
        return (
            <div style={{marginTop: 100, paddingRight: 100, paddingLeft: 100}}>
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
                                    defaultValue=""
                                    value={isActiveU}
                                    onChange={e => setIsActiveU(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="True">True</MenuItem>
                                <MenuItem value="False">False</MenuItem>
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
                                onClick={() => removeUpdate()}>Cancel</Button>
                    </form>
                </Box>
            </div>
        )
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const employee = {
            id: editId,
            last_name: lastNameU,
            first_name: firstNameU,
            is_active: isActiveU,
            date_of_birth: dateU
        };

        await fetch("api/update/",
            {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                return res;
            })
        Fetch()
            .then()
    }

    async function Delete(selectedId) {
        const employee = {
            id: selectedId,
        };

        await fetch("api/delete/",
            {
                method: 'DELETE',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                return res;
            })
        Fetch()
            .then()
    }

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

                return res;
            })
        Fetch()
            .then()
    }

    function addUpdate(id) {
        setEditId(id)
        setShow(true);
    }

    function removeUpdate() {
        setEditId(null)
        setShow(false);
    }

    return (
        <div>
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

            <div style={{marginTop: 100, width: '100%', paddingRight: 100, paddingLeft: 100}}>
                <h1>Edit Employees</h1>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{display: "none"}} align="left">ID</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Is Active</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell style={{display: "none"}} align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.last_name}</TableCell>
                                    <TableCell align="left">{row.first_name}</TableCell>
                                    <TableCell align="left">{row.is_active.toString()}</TableCell>
                                    <TableCell align="left">{row.date_of_birth}</TableCell>
                                    <TableCell align="left">
                                        <IconButton style={{color: "dodgerblue"}} label="edit"
                                                    onClick={() => {setLastNameU(row.last_name); setFirstNameU(row.first_name); setIsActiveU(row.is_active === 'Yes' ? 'True' : 'False'); setDateU(moment(row.date_of_birth, 'DD/MM/YYYY').format('MM/DD/YYYY')); addUpdate(row.id);}}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton style={{color: "orangered"}} label="delete"
                                                    onClick={() => Delete(row.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {show ? renderUpdate() : <div style={{marginTop: 100, paddingRight: 100, paddingLeft: 100}}><h2>Click edit on an Employee to Update</h2></div>}
        </div>
    )
}