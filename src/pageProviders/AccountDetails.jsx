import AccountDetailsPage from 'pages/accountDetails';
import React from 'react';

import PageContainer from './components/PageContainer';

const AccountDetails = (props) => {
    return (
        <PageContainer>
            <AccountDetailsPage {...props} />
        </PageContainer>
    );
};

export default AccountDetails;
