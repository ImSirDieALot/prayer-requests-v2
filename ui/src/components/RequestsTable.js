import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RequestsTable = ({ date, prayerRequests }) => {
    return (
        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
            <h3>{date}</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Requestor</TableCell>
                        <TableCell>Requested For</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prayerRequests.map((request) => (
                        <TableRow key={request._id}>
                            <TableCell>{request.requestor}</TableCell>
                            <TableCell>{request.requestedFor}</TableCell>
                            <TableCell>{request.reason}</TableCell>
                            <TableCell>{request.description}</TableCell>
                            <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RequestsTable;
