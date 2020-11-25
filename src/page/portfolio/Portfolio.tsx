import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { CardColumns } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page, PortfolioCard, PortfolioCardProps } from '../../component'

// constants
import { PORTFOLIO_LIST } from '../../constants'

export const Portfolio = () => {
    const portfolioToComponent = (portfolio: PortfolioCardProps) => (
        <PortfolioCard {...portfolio} />
    )

    return (
        <Page>
            <CardColumns>
                {PORTFOLIO_LIST.map(portfolioToComponent)}
            </CardColumns>
        </Page>
    )
}
