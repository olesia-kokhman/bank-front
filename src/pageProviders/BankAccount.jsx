import BankAccountPage from 'pages/bank';
import React from 'react';

import PageContainer from './components/PageContainer';

const BankAccount = (props) => {
    return (
        <PageContainer>
            <BankAccountPage {...props} />
        </PageContainer>
    );
};

export default BankAccount;
