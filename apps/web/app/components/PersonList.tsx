'use client';

import React, { useContext, useState } from 'react';
import { contextCounterPerson } from '@/app/context/PersonProvider';
import styles from '@/app/styles/PersonList.module.css';
import PersonButton from './PersonButton';
import { IoAdd, IoPersonOutline } from 'react-icons/io5';

const PersonList = () => {
    const context = useContext(contextCounterPerson);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

    if (!context) return;

    const addPerson = () => {
        const newPerson = context.counterPerson.length + 1;
        context.setCounterPerson([...context.counterPerson, newPerson]);
        setSelectedPerson(newPerson);
    };

    const handlePersonClick = (person: number) => {
        setSelectedPerson(person);
    };

    return (
        <div className={styles.persons_container}>
            <PersonButton onClick={addPerson}>
                <IoAdd className={styles.icon_size} />
                Añadir Persona
            </PersonButton>

            {context?.counterPerson.length > 0 &&
                context?.counterPerson.map((person) => (
                    <PersonButton
                        onClick={() => handlePersonClick(person)}
                        key={person}
                        style={{
                            backgroundColor:
                                person === selectedPerson
                                    ? '#d87a22'
                                    : 'rgba(230, 230, 230, 0.9)',
                            color:
                                person === selectedPerson ? 'white' : 'black',
                        }}
                    >
                        <IoPersonOutline style={{ fontSize: '1.2rem' }} />
                        Persona {person}
                    </PersonButton>
                ))}
        </div>
    );
};

export default PersonList;
