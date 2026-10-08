import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const server = {
    /** A stand-in for signing someone up: a mailing list, a database. */
    subscribe: defineAction({
        accept: 'form',
        input: z.object({ email: z.email() }),
        handler: ({ email }) => ({ message: `Subscribed: ${email}` }),
    }),
};
