import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { CardColumns } from 'react-bootstrap'

// ---------------------------
//  Project Dependencies
// ---------------------------
import {
    PageLayout,
    PortfolioCard,
    PortfolioCardProps
} from 'yvip-website/component'

// constants
import { PORTFOLIO_LIST } from 'yvip-website/constants'

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
