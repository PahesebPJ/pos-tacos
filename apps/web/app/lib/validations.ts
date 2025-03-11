import { z } from 'zod';

export const inputTableValidation = z
    .string()
    .refine((value) => value.trim().length >= 4, {
        message: 'Nombre demasiado corto',
    });
