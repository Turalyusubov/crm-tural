import React, { Fragment } from 'react'
import { RenderIfProps } from '@/shared/types'

const RenderIf: React.FC<RenderIfProps> = ({ children, condition, renderElse = '' }) => {
    if (condition) return <Fragment>{children}</Fragment>
    return <Fragment>{renderElse}</Fragment>
}

export default RenderIf
