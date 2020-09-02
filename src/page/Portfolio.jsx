import React from 'react';

// Component
import Page from '../component/Page';
import PortfolioComponent from '../component/PortfolioComponent';

const Portfolio = () => (
    <Page>
        <PortfolioComponent portfolio_list={
            [
                {
                    name: "Mehmet Arif Emre Sen",
                    title: "Major Contributor",
                    info: "Computer Engineer",
                    image_name: "https://gitlab.com/uploads/-/system/user/avatar/1102036/avatar.png?width=400"
                }
            ]
        } />
    </Page>
)

export default Portfolio;
