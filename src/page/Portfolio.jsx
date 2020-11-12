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
import * as Content from '../constants/projectPortfolioList'

const portfolioToComponent = (p) => <PortfolioCard portfolio={p} />

const Portfolio = () => (
  <Page>
    <CardColumns>{Content.portfolioList.map(portfolioToComponent)}</CardColumns>
  </Page>
)

export default Portfolio
