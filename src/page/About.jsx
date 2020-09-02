import React from 'react';

// Component
import Page from '../component/Page';
import TeamInfoComponent from '../component/TeamInfoComponent';

const About = () => (
    <Page>
        <TeamInfoComponent team_member_list={
            [
                {
                    name: "Mehmet Arif Emre Sen",
                    title: "Major Contributor",
                    info: "Computer Engineer",
                    image_name: "https://gitlab.com/uploads/-/system/user/avatar/1102036/avatar.png?width=400"
                },
                {
                    name: "Burak Erkan",
                    title: "Major Contributor",
                    info: "Computer Engineer",
                    image_name: "https://gitlab.com/uploads/-/system/user/avatar/2674558/avatar.png?width=400"
                },
                {
                    name: "Mustafa Arif Sisman",
                    title: "Major Contributor",
                    info: "Computer Engineer",
                    image_name: "https://gitlab.com/uploads/-/system/user/avatar/1907363/avatar.png?width=400"
                },
                {
                    name: "Ahmet Gurdal",
                    title: "Contributor",
                    info: "Computer Engineer",
                    image_name: "https://secure.gravatar.com/avatar/93d5395c86f888c9e820f1805dc874f2?s=800&d=identicon"
                }
            ]
        } />
    </Page>
)

export default About;
