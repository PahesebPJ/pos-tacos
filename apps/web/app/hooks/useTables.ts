import { useEffect, useState } from 'react';
import { getApiCall, apiURL } from '@/app/service/api_calls';
import api_routes from '@/app/service/api_routes';

interface tableInterface {
    id?: number;
    name: string;
    status: number;
}

const useTables = () => {
    const [tables, setTables] = useState<tableInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [cosa, setCosa] = useState(false);

    const setApiTables = async () => {
        setLoading(true);

        try {
            const dataTables = await getApiCall(
                `${apiURL}${api_routes.tables}?order=asc`
            );

            setTables(dataTables);

            console.log('Datos iniciales de tables:', dataTables);
        } catch (error) {
            console.error('Error al obtener datos iniciales:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setApiTables();
        console.log('Renderizando el useEffect');
    }, [cosa]);

    const updateTable = async (id: number, newTable: tableInterface) => {
        try {
            await getApiCall(`${apiURL}${api_routes.tables}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTable),
            });

            setTables((prevTables) =>
                prevTables.map((table) =>
                    table.id === id ? { ...table, ...newTable } : table
                )
            );

            setApiTables();
            setCosa(!cosa);
            console.log('Seteando setapiTables');
        } catch (error) {
            console.error('Error al actualizar tabla:', error);
        }
    };

    return { tables, updateTable, loading };
};

export default useTables;
