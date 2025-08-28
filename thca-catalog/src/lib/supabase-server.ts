import { cookies } from 'next/headers'
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export function getServerComponentSupabase() {
  return createServerComponentClient({ cookies })
}

export function getRouteHandlerSupabase() {
  return createRouteHandlerClient({ cookies })
}