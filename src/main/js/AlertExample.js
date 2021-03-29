import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertExample = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <div>
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
                I am an alert and I can be dismissed!
            </Alert>
        </div>

    );
};

export default AlertExample;