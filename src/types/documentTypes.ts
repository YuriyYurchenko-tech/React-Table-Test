import { z } from 'zod';
import { DocumentSchema } from '../utils/validators';

export type DocumentDataType = z.infer<typeof DocumentSchema>;
export type DocumentFormDataType = Omit<DocumentDataType, 'id' | 'companySigDate' | 'employeeSigDate'>