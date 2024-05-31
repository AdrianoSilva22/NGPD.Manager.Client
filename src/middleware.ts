import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from './accessControl'

export function middleware(request: NextRequest) {
    const url = new URL(request.url)
    const currentPath = url.pathname
    const userRole = request.cookies.get('userRole')?.value

    if (!userRole || !isAuthorized(userRole, currentPath)) {
        const url = new URL('/login', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/estudante/:path*',
        '/instituicao/:path*',
        '/squad/:path*',
        '/empresa/:path*',
        '/mentor/:path*',
        '/dashboard/:path*',
    ],
};
