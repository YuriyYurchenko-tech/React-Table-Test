import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTableData,
  addTableRow,
  updateTableRow,
  deleteTableRow,
} from '../../services/tableService';
import type { DocumentDataType, DocumentFormDataType } from '../../types/documentTypes';

export const fetchData = createAsyncThunk<DocumentDataType[]>('table/fetchData', async () => {
    try {
      const response = await fetchTableData();
      return response || [];
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  });

export const addRow = createAsyncThunk<DocumentDataType, DocumentFormDataType>('table/addRow', async (rowData) => {
  const response = await addTableRow(rowData);
  return response;
});

export const updateRow = createAsyncThunk<DocumentDataType, { id: DocumentDataType['id']; rowData: Partial<DocumentDataType> }>(
  'table/updateRow',
  async ({ id, rowData }) => {
    const response = await updateTableRow(id, rowData);
    return response;
  }
);

export const deleteRow = createAsyncThunk<DocumentDataType['id'], DocumentDataType['id']>('table/deleteRow', async (id) => {
  await deleteTableRow(id);
  return id;
});