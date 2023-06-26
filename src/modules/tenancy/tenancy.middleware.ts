import { NextFunction, Request, Response } from 'express'

export enum TenantMode {
  HEADER = 'HEADER',
  SUBDOMAIN = 'SUBDOMAIN',
  BOTH = 'BOTH',
}

function getHeaderTenantCode (req: Request): string | null {
  return (req.headers['x-tenant-code'] as string) || null
}

function getTenantCode (req: Request, match: RegExpExecArray): string | null {
  const TENANT_MODE = process.env.TENANT_MODE

  if (TENANT_MODE === TenantMode.HEADER) {
    return getHeaderTenantCode(req)
  } else if (TENANT_MODE === TenantMode.BOTH) {
    const headerTenantCode = getHeaderTenantCode(req)
    return match && headerTenantCode === match[1] ? headerTenantCode : null
  } else {
    return match ? match[1] : null
  }
}

export function tenancyMiddleware (
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const host = req.headers.host as string
  const subdomainRegex = /^(?:https?:\/\/)?([^.]+)\./
  const match = subdomainRegex.exec(host)

  req.tenantCode = getTenantCode(req, match)

  next()
}
