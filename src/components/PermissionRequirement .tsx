'use client'
import { ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { TokenDecoded } from '@/models/tokenDecoded'

interface PermissionRequirement {
    permission: string
    children: ReactNode
}

export interface Permissions {
    permissoes: string[]
}

export const PermissionRequirement = ({ permission, children }: PermissionRequirement) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const fetchUserPermissions = async (): Promise<Permissions> => {
        const tokenUserInfo = Cookie.get('tokenUserInfo') as string
        const tokenUserDecoded = jwtDecode(tokenUserInfo) as TokenDecoded
        const userPermissions = JSON.parse(tokenUserDecoded.acesso) as Permissions
        
        return userPermissions
    }

    useEffect(() => {
        const loadUserAndPermissions = async () => {
            const userPermissions = await fetchUserPermissions() as Permissions
            const hasPermissionRequirement = userPermissions.permissoes.includes(permission) as boolean
            setHasPermission(hasPermissionRequirement)
        }

        loadUserAndPermissions()
    }, [permission]);

    return hasPermission ? <>{children}</> : null
}