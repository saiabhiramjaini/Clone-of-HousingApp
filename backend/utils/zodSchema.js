const { z } = require('zod');

const userSignUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    location: z.string(),
    password: z.string().min(8),
    cPassword: z.string().min(8),
});

const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    cPassword: z.string().min(8),
});

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

const resetPasswordSchema = z.object({
    password: z.string().min(8),
    cPassword: z.string().min(8),
});

module.exports = {
    userSignUpSchema,
    signUpSchema,
    signInSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
