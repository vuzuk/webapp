import React from 'react';
import {MediaQuery} from 'react-responsive-hoc'

export const Desktop = (children) => {
    return (
        <MediaQuery query="(min-device-width: 992px)">{children}</MediaQuery>
    )
}

export const Mobile = (children) => {
    return (
        <MediaQuery query="(max-device-width: 991px)">{children}</MediaQuery>
    )
}
