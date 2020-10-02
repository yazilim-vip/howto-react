import React from 'react';
import Cv from '../component/Cv';

export const members = {
  teamMemberList: [
    {
      name: "Mehmet Arif Emre Sen",
      description: <Cv />,
      imageSource: "/img/emre.jpeg",
      title: "Major Contributor",
      links: {
        gitlab: "https://gitlab.com/emresen",
        github: "https://github.com/maemresen",
        bitbucket: "https://bitbucket.org/emresen",
        medium: "https://medium.com/@maemresen",
        linkedin: "https://www.linkedin.com/in/maemresen",
      },
    },
    {
      name: "Burak Erkan",
      description: (
        <div>
          <span>yazilim.vip patriot</span>
          <ul>
            <li>2008 - now (software developer & team lead & manager)</li>
            <li>2000 - now (still a software amateur)</li>
          </ul>
        </div>
      )

      ,
      imageSource: "/img/burak.jpeg",
      title: "Major Contributor",
      links: {
        gitlab: "https://thispersondoesnotexist.com/image",
        medium: "https://thispersondoesnotexist.com/image",
        "google-play": "https://thispersondoesnotexist.com/image",
      },
    },
    {
      name: "Mustafa Arif Sisman",
      title: "Major Contributor",
      description:
        "I am interested in web technologies and artificial intelligence. I'm familiar with the agile software development principles. In the problems I encountered, I try to get an analytical result with help of my analytical thinking skills and technology. I am an active learner.",
      imageSource: "/img/arif.jpeg",
      cvSource: "/cv/arif.pdf",
      links: {
        gitlab: "https://gitlab.com/arifsisman",
        github: "https://github.com/arifsisman",
        bitbucket: "https://bitbucket.org/arifsisman",
        medium: "https://medium.com/@arifsisman",
        linkedin: "https://www.linkedin.com/in/mustafaarifsisman",
        instagram: "https://www.instagram.com/arifssmn",
      },
    },
  ],

  contributorList: [
    {
      name: "Ahmet Gurdal",
      title: "Contributor",
      description:
        "I am just a simple guy who loves technology and science. I am interested in almost anything about technology; Machine Learning, Arduino, Mobile App Development, Web Development, Automatization stuff, Financial Applications, etc. I hope one day, I can create something that I can be really proud of.",
      imageSource: "/img/ahmet.jpeg",
      links: {
        gitlab: "https://thispersondoesnotexist.com/image",
        medium: "https://thispersondoesnotexist.com/image",
        "google-play": "https://thispersondoesnotexist.com/image",
      },
    },
  ]
}