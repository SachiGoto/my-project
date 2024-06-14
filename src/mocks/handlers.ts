import { rest } from 'msw'

export const handlers = [
    rest.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ token: 'fake_token', expiresIn: 3600 }));
    })
]