import React, { useEffect, useState } from 'react';
import { fetchContacts, addContact, updateContact, deleteContact } from './api';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const getContacts = async () => {
            const data = await fetchContacts();
            setContacts(data);
        };
        getContacts();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        const newContact = { name, email, phone };
        const addedContact = await addContact(newContact);
        setContacts([...contacts, addedContact]);
        setName('');
        setEmail('');
        setPhone('');
    };

    const handleDelete = async (id) => {
        await deleteContact(id);
        setContacts(contacts.filter(contact => contact._id !== id));
    };

    return (
        <div>
            <h1>Контакти</h1>
            <form onSubmit={handleAdd}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ім'я" required />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Електронна пошта" required />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" required />
                <button type="submit">Додати контакт</button>
            </form>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        {contact.name} - {contact.email} - {contact.phone}
                        <button onClick={() => handleDelete(contact._id)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
