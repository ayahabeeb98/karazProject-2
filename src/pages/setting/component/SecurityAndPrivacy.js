import React from 'react';
import Security from "./Security";
import Privacy from "./Privacy";

const SecurityAndPrivacy = () => {
    return (
        <>
            <h2 className="editHeader">الأمان والخصوصية</h2>
            <hr/>
            <Security/>
            <Privacy/>
        </>
    )
};

export default SecurityAndPrivacy;

