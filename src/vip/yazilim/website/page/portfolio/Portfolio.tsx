import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { CardColumns } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { PageLayout, PortfolioCard, PortfolioCardProps } from '../../component'

// constants
import { PORTFOLIO_LIST } from '../../constants'

export const Portfolio = () => {
    const portfolioToComponent = (portfolio: PortfolioCardProps) => (
        <PortfolioCard {...portfolio} />
    )

    return (
        <PageLayout>
            <CardColumns>
                {PORTFOLIO_LIST.map(portfolioToComponent)}
            </CardColumns>
        </PageLayout>
    )
}
