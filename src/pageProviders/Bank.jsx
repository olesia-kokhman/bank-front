import BankPage from 'pages/bank';
import React from 'react';

import PageContainer from './components/PageContainer';

const Bank = (props) => {
    return (
        <PageContainer>
            <BankPage {...props} />
        </PageContainer>
    );
};

export default Bank;
