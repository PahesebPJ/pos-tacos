import { useEffect, useState } from 'react';
import { getApiCall, apiURL } from '@/app/service/api_calls';
import api_routes from '@/app/service/api_routes';

const useTables = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const setApiTables = async () => {
            const dataTables = await getApiCall(
                `${apiURL}${api_routes.tables}`
            );

            setTables(dataTables);
        };

        setApiTables();
    }, []);

    return { tables };
};

export default useTables;
