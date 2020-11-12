import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { CardColumns } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page, PortfolioCard } from '../component'

// constants
import { PORTFOLIO_LIST } from '../constants'

const portfolioToComponent = (p) => <PortfolioCard portfolio={p} />

const Portfolio = () => (
  <Page>
    <CardColumns>{PORTFOLIO_LIST.map(portfolioToComponent)}</CardColumns>
  </Page>
)

export default Portfolio
