import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from './accessControl'
import { jwtDecode } from 'jwt-decode'
import { TokenUserInfo } from './models/tokenUserInfo'

export function middleware(request: NextRequest) {

    const url = new URL(request.url)
    const currentPath = url.pathname
    const userRole = request.cookies.get('tokenUserInfo')?.value

    if (!userRole) {
        const url = new URL('/login', request.url)
        return NextResponse.redirect(url)
    } else {
        const tokenDecoded = jwtDecode(userRole) as TokenUserInfo

        if (!tokenDecoded.role || !isAuthorized(tokenDecoded.role, currentPath)) {
            const url = new URL('/login', request.url)
            return NextResponse.redirect(url)
        } else {
            return NextResponse.next()
        }
    }
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
        '/user/:path*',
    ],
};
