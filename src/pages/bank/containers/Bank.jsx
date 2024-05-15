import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';
import axios from 'axios';

function Bank() {
    const [bankData, setBankData] = useState(null);
    console.log(bankData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bank');
                setBankData(response.data);
            } catch (error) {
                console.error('Error fetching bank data:', error);
            }
        };

        fetchData();

        return () => {};
    }, []);

    return (
        <div>
            <Typography variant="title">Bank Component</Typography>
            {bankData ? (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bankData.map(bank => (
                            <tr>
                                <td>{bank.id}</td>
                                <td>{bank.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </div>
    );
}

export default Bank;

