import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import styles from './DialogModal.module.css';
import type { DocumentFormDataType } from '../../../types/documentTypes';

interface DocumentDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: DocumentFormDataType;
  onChange: (field: keyof DocumentFormDataType, value: string) => void;
  onSubmit: () => void;
  formErrors: Record<string, string>;
  isEdit?: boolean;
}

export const DialogModal: React.FC<DocumentDialogProps> = ({
  open,
  onClose,
  title,
  data,
  onChange,
  onSubmit,
  formErrors,
  isEdit,
}) => {
  const allFields: (keyof DocumentFormDataType)[] = [
    'companySignatureName',
    'documentName',
    'documentStatus',
    'documentType',
    'employeeNumber',
    'employeeSignatureName'
  ];

  const isFormValid = allFields.every(field => Boolean(data[field]));

  const formatLabel = (field: string) => {
    return field.replace(/([A-Z])/g, ' $1') + ' *';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
      <DialogContent>
        {allFields.map((field) => (
          <TextField
            key={field}
            className={styles.dialogTextField}
            label={formatLabel(field)}
            value={data[field]}
            onChange={(e) => onChange(field, e.target.value)}
            fullWidth
            margin="normal"
            error={!!formErrors[field]}
            helperText={formErrors[field]}
            required
          />
        ))}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          {isEdit ? 'Save Changes' : 'Add Document'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};