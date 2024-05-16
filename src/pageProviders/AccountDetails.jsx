import AccountDetailsPage from 'pages/accountDetails';
import React from 'react';

import PageContainer from './components/PageContainer';

const BankAccount = (props) => {
    return (
        <PageContainer>
            <AccountDetailsPage {...props} />
        </PageContainer>
    );
};

export default BankAccount;
