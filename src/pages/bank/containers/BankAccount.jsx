import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BankAccount.css'
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {Link} from "react-router-dom";

function BankAccount() {
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

    const deleteAccount = (accountId) => {
        const apiUrl = `http://localhost:8080/api/bank_accounts/${accountId}`;
        axios.delete(apiUrl)
            .then(() => {
                console.log("successfully deleted");
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    };

    return (
        <div>
            {bankData ? (
                <div>
                    <table className="bank-account-table">
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
                                <td>{<Link to={`${pageURLs[pages.bankAccountPage]}/${account.id}`}>{account.id}</Link>}</td>
                                <td>{account.accountNumber}</td>
                                <td>{account.balance}</td>
                                <td>{account.currency}</td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteAccount(account.id)}>Delete Button</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ): "error getting the data"}
        </div>
    );
}

export default BankAccount;

