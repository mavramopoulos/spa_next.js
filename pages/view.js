import {useEffect, useState} from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import {useRouter} from "next/router";
import {getCsrfToken, getSession, useSession} from "next-auth/react";
import moment from "moment";


export default function View() {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const {data: session, status} = useSession()
    const [employees, setEmployees] = useState([])
    const [deleteId, setDeleteId] = useState()

    async function Fetch() {
        await fetch("api/select", {method: 'GET', mode: 'cors'})
            .then(res => res.json())
            .then(employees => setEmployees(employees))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (status === "authenticated") {
            Fetch()
                .then()
        }
    }, [status])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/')
        }
    }, [status]);

    async function Delete(selectedId) {
        const employee = {
            id: selectedId,
        };

        await fetch("api/delete",
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

    useEffect(() => {
        if (deleteId) {
            handleClickOpen()
        }
    }, [deleteId]);

    const AlertDialog = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Employee"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this employee?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose();
                            Delete(deleteId).then();
                            setDeleteId()
                        }}>Yes</Button>
                        <Button onClick={() => {
                            handleClose();
                            setDeleteId()
                        }} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <div>
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
                                                    onClick={() => router.push({pathname: '/update/[id]',
                                                        query: {
                                                            id: row.id
                                                        },
                                                    })}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton style={{color: "orangered"}} label="delete"
                                                    onClick={() => setDeleteId(row.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <AlertDialog/>
        </div>
    )
}