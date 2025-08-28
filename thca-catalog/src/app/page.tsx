import { redirect } from 'next/navigation'
import { getServerComponentSupabase } from '@/lib/supabase-server'

export default async function Home() {
  const supabase = getServerComponentSupabase()
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    redirect('/catalog')
  } else {
    redirect('/login')
  }
}