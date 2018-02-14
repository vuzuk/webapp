import MediaQuery from 'react-responsive'

export function Desktop(children) {
    return (
        <MediaQuery minDeviceWidth={992} values={{ deviceWidth: 1600 }}>{children}</MediaQuery>
    )
}

export function Mobile(children) {
    return (
        <MediaQuery minDeviceWidth={992} values={{ deviceWidth: 1600 }}>{children}</MediaQuery>
    )
}