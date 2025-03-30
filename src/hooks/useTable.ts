import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addRow, updateRow, deleteRow, fetchData } from '../redux/table/tableAsyncThunk';
import { DocumentDataType, DocumentFormDataType } from '../types/documentTypes';

export const useTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.table);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddRow = async (newRow: DocumentFormDataType) => {
    try {
      setIsSyncing(true);
      const fullNewRow = {
        ...newRow,
        id: Date.now().toString(),
        companySigDate: new Date().toISOString(),
        employeeSigDate: new Date().toISOString()
      };
      await dispatch(addRow(fullNewRow));
      await dispatch(fetchData());
    } catch (error) {
      console.error('Failed to add row:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateRow = async (id: DocumentDataType['id'], rowData: Partial<DocumentDataType>) => {
    try {
      await dispatch(updateRow({ id, rowData }));
      await dispatch(fetchData());
    } catch (error) {
      console.error('Failed to update row:', error);
    }
  };

  const handleDeleteRow = async (id: DocumentDataType['id']) => {
    try {
      await dispatch(deleteRow(id));
      await dispatch(fetchData());
    } catch (error) {
      console.error('Failed to delete row:', error);
    }
  };

  return {
    tableData: data || [],
    loading,
    error,
    isSyncing,
    handleAddRow,
    handleUpdateRow,
    handleDeleteRow,
    fetchTableData: () => dispatch(fetchData())
  };
};