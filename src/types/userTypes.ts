import { z } from 'zod';
import { AuthSchema } from "../utils/validators";

export type AuthFormDataType = z.infer<typeof AuthSchema>;
