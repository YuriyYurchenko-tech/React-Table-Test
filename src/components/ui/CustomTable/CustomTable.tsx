import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
  Tooltip
} from '@mui/material';
import styles from './CustomTable.module.css';
import type { DocumentDataType } from '../../../types/documentTypes';

interface CustomTableProps {
  tableData: DocumentDataType[];
  loading: boolean;
  error: string | null;
  isSyncing: boolean;
  onEdit: (row: DocumentDataType) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  tableData,
  loading,
  error,
  isSyncing,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const isRowValid = (row: DocumentDataType) => {
    const requiredFields = [
      row.companySignatureName,
      row.documentName,
      row.documentStatus,
      row.documentType,
      row.employeeNumber,
      row.employeeSignatureName
    ];
    return requiredFields.every(Boolean);
  };

  if (loading && !tableData.length) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.errorContainer}>
        <Alert className={styles.errorAlert} severity="error">
          {error}
        </Alert>
        <Button variant="contained" onClick={onRefresh}>
          Refresh Data
        </Button>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Sig Date</TableCell>
            <TableCell>Company Signature</TableCell>
            <TableCell>Document Name</TableCell>
            <TableCell>Document Status</TableCell>
            <TableCell>Document Type</TableCell>
            <TableCell>Employee Number</TableCell>
            <TableCell>Employee Sig Date</TableCell>
            <TableCell>Employee Signature</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((row) => (
              <Tooltip 
                key={row.id} 
                title={!isRowValid(row) ? "This row has missing required fields" : ""}
                arrow
              >
                <TableRow className={!isRowValid(row) ? styles.invalidRow : ''}>
                  <TableCell>{new Date(row.companySigDate).toLocaleString()}</TableCell>
                  <TableCell>{row.companySignatureName || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>{row.documentName || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>{row.documentStatus || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>{row.documentType || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>{row.employeeNumber || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>{new Date(row.employeeSigDate).toLocaleString()}</TableCell>
                  <TableCell>{row.employeeSignatureName || <span className={styles.missingField}>Missing</span>}</TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      onClick={() => onEdit(row)}
                      className={styles.actionButton}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </Tooltip>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};