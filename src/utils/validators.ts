import { z } from 'zod';

export const DocumentSchema = z.object({
    id: z.string(),
    companySigDate: z.string(),
    companySignatureName: z.string(),
    documentName: z.string(),
    documentStatus: z.string(),
    documentType: z.string(),
    employeeNumber: z.string(),
    employeeSigDate: z.string(),
    employeeSignatureName: z.string(),
});

export const AuthSchema = z.object({
    username: z.string(),
    password: z.string(),
});