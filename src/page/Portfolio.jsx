import React from 'react';

// Component
import Page from '../component/Page';
import PortfolioCard from '../component/PortfolioCard';
import { CardColumns } from 'react-bootstrap';
import * as Constants from '../constants';

const portfolioToComponent = (p) => <PortfolioCard portfolio={p} />

const Portfolio = () => (
    <Page>
        <CardColumns>
            {
                Constants.portfolioList.map(portfolioToComponent)
            }
        </CardColumns>
    </Page>
)

export default Portfolio;
