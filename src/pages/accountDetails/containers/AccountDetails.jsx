import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';

function AccountDetails() {
    const location = useLocation();
    console.log("location: ", location);

    const [id, setId] = useState(null);
    const [accountNumber, setAccountNumber] = useState(null);
    const [balance, setBalance] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [bankId, setBankId] = useState(null);
    const [bankName, setBankName] = useState(null);
    const [creditLimit, setCreditLimit] = useState(null);

    const [isEditing, setIsEditing] = useState(null);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (location.state?.id) {
            setId(location.state.id);
        }
        if (location.state?.accountNumber) {
            setAccountNumber(location.state.accountNumber);
        }
        if (location.state?.balance) {
            setBalance(location.state.balance);
        }
        if (location.state?.currency) {
            setCurrency(location.state.currency);
        }
        if (location.state?.bank.id) {
            setBankId(location.state.bank.id);
        }
        if (location.state?.bank.name) {
            setBankName(location.state.bank.name);
        }
        if (location.state?.creditLimit) {
            setCreditLimit(location.state.creditLimit);
        }

    }, [location.state?.id, location.state?.accountNumber, location.state?.balance, location.state?.currency,
    location.state?.bank.id, location.state?.bank.name, location.state?.creditLimit]);

    const changeIsEditing = () => {
        setIsEditing(!isEditing);
    };

    const saveAccountDetails = () => {
        const updatedAccount = {
            id: document.getElementById("id").value,
            accountNumber: document.getElementById("account-number").value,
            balance: document.getElementById("balance").value,
            currency: document.getElementById("currency").value,
            bank: {
                id: document.getElementById("bank-id").value,
                name: document.getElementById("bank-name").value
            },
            creditLimit: document.getElementById("credit-limit").value
        };

        const apiUrl = `http://localhost:8080/api/bank_accounts/${updatedAccount.id}`;
        axios.put(apiUrl, updatedAccount)
            .then((response) => {
                console.log(response);
                console.log("success updating the account");

                setAccountNumber(response.accountNumber);
                setBalance(response.balance);
                setCurrency(response.currency);
                setBankId(response.bank.id);
                setBankName(response.bank.name);
                setCreditLimit(response.creditLimit);

                changeIsEditing();

                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);

            })
            .catch((error) => {
                console.log("error", error);
                setShowErrorMessage(true);
            });

    };

    return (
        <div>
            <div>
                {isEditing ? (
                    <div>
                        <p id="update-error-message" style={{ display: showErrorMessage ? 'block' : 'none' }}>
                            failed to update the account details</p>

                        <button onClick={() => saveAccountDetails() }>Save</button>
                        <button onClick={() => changeIsEditing() }>Cancel</button>
                    </div>
                ): (
                    <div>
                        <p id="update-success-message" style={{ display: showSuccessMessage ? 'block' : 'none' }}>
                            the account details were successfully updated</p>

                        <button onClick={() => changeIsEditing()}>Edit</button>
                    </div>
                )}
            </div>
            <div>
                <h4>Account details:</h4>
                <div>
                    <input id="id" type="text" value={id} readOnly/>
                </div>
                <div>
                    <input id="account-number" type="text" value={accountNumber} readOnly={!isEditing}/>
                </div>
                <div>
                    <input id="balance" type="text" value={balance} className="changeReadOnly" readOnly={!isEditing}/>
                </div>
                <div>
                    <input id="currency" type="text" value={currency} className="changeReadOnly" readOnly={!isEditing}/>
                </div>
                <div>
                    <input id="bank-id" type="text" value={bankId} className="changeReadOnly" readOnly={!isEditing}/>
                </div>
                <div>
                    <input id="bank-name" type="text" value={bankName} className="changeReadOnly" readOnly={!isEditing}/>
                </div>
                <div>
                    <input id="credit-limit" type="text" value={creditLimit} className="changeReadOnly" readOnly={!isEditing}/>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
