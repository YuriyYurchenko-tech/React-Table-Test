import React, { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { useTable } from '../../../hooks/useTable';
import { CustomTable } from '../../ui/CustomTable/CustomTable';
import { DialogModal } from '../../ui/DialogModal/DialogModal';
import styles from './TablePage.module.css';
import type { DocumentFormDataType, DocumentDataType } from '../../../types/documentTypes';

export default function TablePage(): React.JSX.Element {
  const {
    tableData,
    loading,
    error,
    isSyncing,
    handleAddRow,
    handleUpdateRow,
    handleDeleteRow,
    fetchTableData,
  } = useTable();

  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editData, setEditData] = useState<DocumentDataType | null>(null);
  const [newRow, setNewRow] = useState<Omit<DocumentFormDataType, 'id' | 'companySigDate' | 'employeeSigDate'>>({
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSignatureName: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (data: Omit<DocumentFormDataType, 'id' | 'companySigDate' | 'employeeSigDate'>) => {
    const errors: Record<string, string> = {};
    const allFields = [
      'companySignatureName',
      'documentName',
      'documentStatus',
      'documentType',
      'employeeNumber',
      'employeeSignatureName'
    ] as const;
  
    allFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
  
    return errors;
  };

  const handleAddSubmit = async () => {
    const errors = validateForm(newRow);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      await handleAddRow({
        ...newRow,
        companySigDate: new Date().toISOString(),
        employeeSigDate: new Date().toISOString()
      });
      setNewRow({
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSignatureName: ''
      });
      setOpenAddDialog(false);
      setFormErrors({});
    } catch (err) {
      console.error('Add row error:', err);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!editData?.id) return;
    
    const errors = validateForm(editData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await handleUpdateRow(editData.id, editData);
      setOpenDialog(false);
      setFormErrors({});
    } catch (err) {
      console.error('Update row error:', err);
    }
  };

  const handleChange = (field: keyof Omit<DocumentFormDataType, 'id' | 'companySigDate' | 'employeeSigDate'>, value: string) => {
    if (openDialog && editData) {
      setEditData({ ...editData, [field]: value });
    } else {
      setNewRow({ ...newRow, [field]: value });
    }
  };

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.actionsContainer}>
        <Box>
          <Button 
            variant="contained" 
            onClick={() => setOpenAddDialog(true)}
            disabled={isSyncing}
            startIcon={isSyncing ? <CircularProgress size={20} /> : null}
            className={styles.addButton}
          >
            Add Row
          </Button>
        </Box>
      </Box>

      <CustomTable
        tableData={tableData}
        loading={loading}
        error={error}
        isSyncing={isSyncing}
        onEdit={(row) => {
          setEditData(row);
          setOpenDialog(true);
        }}
        onDelete={handleDeleteRow}
        onRefresh={fetchTableData}
      />

      <DialogModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Edit Document"
        data={editData || { ...newRow, id: '', companySigDate: '', employeeSigDate: '' }}
        onChange={handleChange}
        onSubmit={handleUpdateSubmit}
        formErrors={formErrors}
        isEdit
      />

      <DialogModal
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setFormErrors({});
        }}
        title="Add New Document"
        data={newRow}
        onChange={handleChange}
        onSubmit={handleAddSubmit}
        formErrors={formErrors}
      />
    </Box>
  );
};
