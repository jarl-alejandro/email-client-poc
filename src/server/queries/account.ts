// src/server/queries/account.ts
import { db } from "@/server/db"

export function getGoogleAccountByUserId(userId: string) {
  const stmt = db.prepare(`
    SELECT
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      scope
    FROM account
    WHERE userId = ?
      AND providerId = 'google'
    LIMIT 1
  `)

  return stmt.get(userId) as {
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: string | null
    scope: string | null
  } | undefined
}
