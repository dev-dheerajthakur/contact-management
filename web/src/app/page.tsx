export const dynamic = 'force-dynamic';

import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import { formAction } from './api/actions/form-action';
import { getContacts } from './api/actions/get-contacts';

export default async function page() {
  const contacts = await getContacts();
  return (
    <div style={{display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: 'center', paddingTop: 30}}>
      <h1 style={{fontWeight: 700, marginBottom: 20}}>Contact Management</h1>
      <ContactForm formAction={formAction} />
      <Contacts contacts={contacts} />
    </div>
  )
}
