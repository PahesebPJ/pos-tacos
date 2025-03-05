'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const Table = () => {
    const params = useParams();
    const { id } = params;
    return <div>Hello world from table {id}</div>;
};

export default Table;
