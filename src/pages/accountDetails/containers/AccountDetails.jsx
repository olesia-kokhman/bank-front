import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';

function AccountDetails() {
    const { formatMessage } = useIntl();

    return (
        <Typography>
            {formatMessage({ id: 'title' })}
        </Typography>
    );
}

export default AccountDetails;
