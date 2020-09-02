import React from 'react';

// Component
import Page from '../component/Page';
import PortfolioCard from '../component/PortfolioCard';
import { CardColumns } from 'react-bootstrap';

const portolioList = [
    {
        name: "Play2Gether",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        imageSource: "https://thispersondoesnotexist.com/image",
        links: {
            "gitlab" : "https://thispersondoesnotexist.com/image",
            "medium" : "https://thispersondoesnotexist.com/image"
        }
    }, 
    {
        name: "Play2Gether",
        description: "Desc........"
    }, 
    {
        name: "Play2Gether",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    }, 
    {
        name: "Play2Gether",
        description: "Desc........"
    }
]

const portfolioToComponent = (p) => <PortfolioCard portfolio={p} />

const Portfolio = () => (
    <Page>
        <CardColumns>
            {
                portolioList.map(portfolioToComponent)
            }
        </CardColumns>
    </Page>
)

export default Portfolio;
