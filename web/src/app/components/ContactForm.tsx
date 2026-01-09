'use client'
import React, { useActionState, useEffect } from "react";
import styles from "./contact-form.module.css";
import { Fingerprint, Mail, Phone, User } from "lucide-react";

export interface FormState {
  message?: string,
  success?: boolean,
  error?: unknown
}

interface Props {
  formAction: (state: FormState, formData?: FormData) => Promise<FormState>
}

export default function ContactForm({formAction}: Props) {
  const [formState, newFormAction, isPending] = useActionState<FormState>(formAction, {})

  useEffect(() => {

    if(formState.success){alert('contact created successfully')}
    if(formState.success===false){alert(formState.message)}
  }, [formState])
  

  return (
    <form className={styles.form} action={newFormAction}>
      <h2>Add new Contact</h2>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name"><User size={14} fontWeight={900} />&nbsp; Name *</label>
        <input spellCheck={false} className={styles.input} type="text" name="name" required placeholder="John Doe" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email"><Mail size={14} fontWeight={900} />&nbsp; Email *</label>
        <input spellCheck={false} className={styles.input} type="email" name="email" required placeholder="john@example.com" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone"><Phone size={14} fontWeight={900} />&nbsp; Phone *</label>
        <input spellCheck={false} className={styles.input} type="tel" name="phone" required placeholder="9876543210" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="bio"><Fingerprint size={14} fontWeight={900} />&nbsp; Bio (optional) *</label>
        <textarea className={styles.input} name="bio" placeholder="Add a note..."></textarea>
      </div>
      <button disabled={isPending} type="submit">Add Contact</button>
    </form>
  );
}
