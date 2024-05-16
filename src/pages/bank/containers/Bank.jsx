import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bank.css'

function Bank() {
    const [bankData, setBankData] = useState([]);

    useEffect(() => {
        const apiUrl = "http://localhost:8080/api/bank_accounts";
        axios.get(apiUrl)
            .then((response) => {
                setBankData(response);
                console.log(response);
            })
            .catch((error) => {
                console.error("error ", error);
            });
    }, []);

    return (
        <div>
            {bankData ? (
                <div>
                    <table className="bank-table">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Account Number</th>
                            <th>Balance</th>
                            <th>Currency</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bankData.map(account => (
                            <tr>
                                <td>{account.id}</td>
                                <td>{account.accountNumber}</td>
                                <td>{account.balance}</td>
                                <td>{account.currency}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ): "error getting the data"}
        </div>
    );
}

export default Bank;

