import axios from 'axios';
import type { DocumentDataType, DocumentFormDataType } from '../types/documentTypes';

const API_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs';

export const fetchTableData = async (): Promise<DocumentDataType[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.get<{data: DocumentDataType[]}>(`${API_URL}/userdocs/get`, {
      headers: {
        'x-auth': token,
      },
    });
    console.log('Fetched table data:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch table data:', error);
    throw error;
  }
};

export const addTableRow = async (rowData: DocumentFormDataType): Promise<DocumentDataType> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  try {
    const fullRowData = {
      ...rowData,
      companySigDate: new Date().toISOString(),
      employeeSigDate: new Date().toISOString(),
    };

    await axios.post(`${API_URL}/userdocs/create`, fullRowData, {
      headers: { 'x-auth': token }
    });
    
    return {
      ...fullRowData,
      id: Date.now().toString()
    };
  } catch (error) {
    console.error('Failed to add row:', error);
    throw error;
  }
};

export const updateTableRow = async (id: DocumentDataType['id'], rowData: Partial<DocumentDataType>): Promise<DocumentDataType> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post<{data: DocumentDataType}>(`${API_URL}/userdocs/set/${id}`, rowData, {
      headers: {
        'x-auth': token,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to update row:', error);
    throw error;
  }
};

export const deleteTableRow = async (id: DocumentDataType['id']): Promise<string> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    await axios.post(`${API_URL}/userdocs/delete/${id}`, null, {
      headers: {
        'x-auth': token,
      },
    });
    return id;
  } catch (error) {
    console.error('Failed to delete row:', error);
    throw error;
  }
};