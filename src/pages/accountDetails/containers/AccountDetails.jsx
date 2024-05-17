import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import {useParams} from "react-router-dom";

function AccountDetails() {
    const { formatMessage } = useIntl();
    const { accountId } = useParams();

    return (
        <div>

        </div>
    );
}

export default AccountDetails;
