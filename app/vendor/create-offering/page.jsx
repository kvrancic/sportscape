
import {OfferingForm} from './OfferingForm'

import { createClient } from '@/utils/supabase/server'

export default async function CreateOffering() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <OfferingForm user={user} />
}