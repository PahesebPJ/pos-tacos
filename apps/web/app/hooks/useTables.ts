import { useCallback, useEffect, useState } from 'react';
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

    const setApiTables = async () => {
        setLoading(true);

        try {
            const dataTables = await getApiCall(
                `${apiURL}${api_routes.tables}?order=asc`
            );

            setTables(dataTables);
        } catch (error) {
            console.error('Error al obtener datos iniciales:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setApiTables();
    }, []);

    const updateTable = async (id: number, tableUpdated: tableInterface) => {
        try {
            await getApiCall(`${apiURL}${api_routes.tables}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tableUpdated),
            });

            setTables((prevTables) =>
                prevTables.map((table) =>
                    table.id === id ? { ...table, ...tableUpdated } : table
                )
            );
        } catch (error) {
            console.error('Error al actualizar tabla:', error);
        }
    };

    /* const createTable = async (newTable: tableInterface) => {
        try {
            const dataNewTable = await getApiCall(
                `${apiURL}${api_routes.tables}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTable),
                }
            );

            setTables((prevTables) => [
                ...prevTables,
                { ...newTable, id: dataNewTable.id },
            ]);
        } catch (error) {
            console.error('Error al actualizar tabla:', error);
        }
    }; */
    const createTable = useCallback(
        async (newTable: tableInterface) => {
            try {
                const dataNewTable = await getApiCall(
                    `${apiURL}${api_routes.tables}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newTable),
                    }
                );

                setTables((prevTables) => [
                    ...prevTables,
                    { ...newTable, id: dataNewTable.id },
                ]);
            } catch (error) {
                console.error('Error al actualizar tabla:', error);
            }
        },
        [setTables]
    );

    return { tables, updateTable, loading, createTable };
};

export default useTables;
