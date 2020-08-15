import React from 'react';

// Component
import Page from '../component/Page';
import TeamInfoComponent from '../component/TeamInfoComponent';

const About = () => (
    <Page>
        <TeamInfoComponent team_member_list={
            [
                {
                    name: "Emre Sen",
                    title: "Major Contributor",
                    info: "Info",
                    image_name: "linux-penguin.jpg"
                },
                {
                    name: "Emre Sen",
                    title: "Major Contributor",
                    info: "Info",
                    image_name: "linux-penguin.jpg"
                },
                {
                    name: "Emre Sen",
                    title: "Major Contributor",
                    info: "Info",
                    image_name: "linux-penguin.jpg"
                },
                {
                    name: "Emre Sen",
                    title: "Major Contributor",
                    info: "Info",
                    image_name: "linux-penguin.jpg"
                },
                {
                    name: "Emre Sen",
                    title: "Major Contributor",
                    info: "Info",
                    image_name: "linux-penguin.jpg"
                }
            ]
        } />
    </Page>
)

export default About;
