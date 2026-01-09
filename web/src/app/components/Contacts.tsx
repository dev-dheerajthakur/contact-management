"use client";
import React, { useEffect, useState } from "react";
import styles from "./contacts.module.css";
import { ChartNetwork, User } from "lucide-react";
import { io } from "socket.io-client";

interface contact {
  name: string;
  email: string;
  phone: string;
  bio?: string;
}

interface Prop {
  contacts: {
    success: boolean;
    length: number;
    data: contact[];
  };
}

function Contact(contact: contact) {
  return (
    <div className={styles.contactList}>
      <div
        className={styles.listItem}
        style={{ display: "flex", alignItems: "center" }}
      >
        <User size={20} className={styles.userIcon} />
        <strong>{contact.name}</strong>
      </div>
      <div
        className={styles.listItem}
        style={{ display: "flex", alignItems: "center" }}
      >
        {contact.email}
      </div>
      <div
        className={styles.listItem}
        style={{ display: "flex", alignItems: "center" }}
      >
        {contact.phone}
      </div>
      <div
        className={styles.listItem}
        style={{ display: "flex", alignItems: "center" }}
      >
        {contact.bio}
      </div>
    </div>
  );
}

export default function Contacts({ contacts }: Prop) {
  const [contactList, setContactList] = useState(contacts.data.toReversed());
  useEffect(() => {
    const socket = io("https://contact-management-93dy.onrender.com");
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("contact-created", (data) => {
      console.log(data);
      setContactList((prev) => [data, ...prev]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(contactList);
  }, [contactList]);

  return (
    <div className={styles.contacts}>
      <div className={styles.header}>
        <strong style={{fontSize: 24}}>Contacts ({contactList.length})</strong>
        <div className={styles.listTemp}>
          <div>NAME</div>
          <div>EMAIL</div>
          <div>PHONE</div>
          <div>BIO</div>
        </div>
      </div>
      {contactList.map((contact, i) => {
        return <Contact key={i} {...contact} />;
      })}
    </div>
  );
}
