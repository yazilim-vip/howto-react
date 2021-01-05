import React, { FC } from 'react'

import { Col, Row } from 'react-bootstrap'

export interface PageLayoutProps {
    children: JSX.Element
}
export const PageLayout: FC<PageLayoutProps> = ({ children }: PageLayoutProps) => {
    return (
        <Col md={{ span: 12 }} style={{ height: '100%' }}>
            <Row>
                <Col md="12">{children}</Col>
            </Row>
        </Col>
    )
}
