import React from 'react'

// Component
import Page from '../component/Page'
import PortfolioCard from '../component/PortfolioCard'
import { CardColumns } from 'react-bootstrap'
import * as Content from '../constants/projectPortfolioList'

const portfolioToComponent = (p) => <PortfolioCard portfolio={p} />

const Portfolio = () => (
  <Page>
    <CardColumns>{Content.portfolioList.map(portfolioToComponent)}</CardColumns>
  </Page>
)

export default Portfolio
