import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BankAccount.css'
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {Link, useNavigate} from "react-router-dom";

function BankAccount() {
    const [bankData, setBankData] = useState([]);
    const navigate = useNavigate();

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

    const navigateToAccountDetails = (account) => {
        console.log("account in navigate: ", {account})
        navigate(`${pageURLs[pages.bankAccountPage]}/${account.id}`, { state: account});
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
                            <tr onClick={() => navigateToAccountDetails(account)}>
                                <td>{account.id}</td>
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

