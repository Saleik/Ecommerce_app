import React from 'react'
import PropTypes from 'prop-types'

export const MessageBox = props => {
    const { variant, children } = props
    return <div className={`alert alert-${variant || 'info'}`}>
        {children}
    </div>
}

MessageBox.propTypes = {
    variant: PropTypes.string
}