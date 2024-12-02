import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from './accessControl'
import { jwtDecode } from 'jwt-decode'

export function middleware(request: NextRequest) {

    const url = new URL(request.url)
    const currentPath = url.pathname
    const perfilCodidficado = request.cookies.get('userProfile')?.value

    if (!perfilCodidficado) {
        const url = new URL('/login', request.url)
        return NextResponse.redirect(url)
    } else {
        const perfil = jwtDecode(perfilCodidficado) as string
        
        if (!perfil || !isAuthorized(perfil, currentPath)) {
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
