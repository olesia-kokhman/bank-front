import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BankAccount.css'
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {useNavigate} from "react-router-dom";

function BankAccount() {
    const [bankData, setBankData] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBankAccounts = (page, size) => {
            const apiUrl = `http://localhost:8080/api/bank_accounts?page=${page}&size=${size}`;
            axios.get(apiUrl)
                .then((response) => {
                    setBankData(response.content);
                    setCurrentPage(response.number);
                    setTotalPages(response.totalPages);

                })
                .catch((error) => {
                    console.error("error ", error);
                });
        };

        fetchBankAccounts(currentPage, pageSize);
    },  [currentPage, pageSize]);

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

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <div>
                <button>Create Bank Account</button>
            </div>
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
                        <div className="pagination-controls">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                Previous</button>
                            <span>{currentPage + 1} of {totalPages}</span>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                                Next</button>
                        </div>
                    </div>
                ): "error getting the data"}
            </div>
        </div>
    );
}

export default BankAccount;

