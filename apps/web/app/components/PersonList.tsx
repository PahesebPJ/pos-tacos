/* eslint-disable react/prop-types */
'use client';

import styles from '@/app/styles/PersonList.module.css';
import PersonButton from './PersonButton';
import { IoAdd, IoPersonOutline } from 'react-icons/io5';
import { PersonListProps } from '../props/PersonListProps';

const PersonList: React.FC<PersonListProps> = ({
    orders,
    selectedPersonId,
    onSelectPerson,
    onAddPerson,
}) => {
    return (
        <div className={styles.persons_container}>
            <PersonButton onClick={onAddPerson}>
                <IoAdd className={styles.icon_size} />
                Añadir Persona
            </PersonButton>
            {
                orders.map(order => 
                    <PersonButton
                        onClick={() => onSelectPerson(order.personId)}
                        key={order.personId}
                        style={{
                            backgroundColor:
                                order.personId === selectedPersonId
                                    ? '#d87a22'
                                    : 'rgba(230, 230, 230, 0.9)',
                            color:
                                order.personId === selectedPersonId ? 'white' : 'black',
                        }}
                    >
                        <IoPersonOutline style={{ fontSize: '1.2rem' }} />
                        {order.personName}
                    </PersonButton>
                )
            }
        </div>
    );
};

export default PersonList;
