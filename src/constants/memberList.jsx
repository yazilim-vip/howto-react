import React from 'react';
import { VipCv } from '../component/VipCv';


import emreCvSections from './emreCvSections';

export const members = {
  teamMemberList: [
    {
      name: "Mehmet Arif Emre Sen",
      description: "I am an entrepreneur who wants to learn new technologies and use them to make things easier. My life goal is having my own job and creating a software community that everyone can get benefit from. I have deep interest to Object Oriented Paradigm",
      imageSource: "/img/emre.jpeg",
      cvSource: (
        <VipCv printable={false} title="Mehmet Arif Emre Şen" sections={emreCvSections} />
      ),
      modalSize: "xl",
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
      ),
      imageSource: "/img/burak.jpeg",
      // cvSource: "/cv/burak.pdf",
      title: "Major Contributor",
    },

    {
      name: "Mustafa Arif Sisman",
      title: "Major Contributor",
      description:
        "I am interested in web technologies and artificial intelligence. I am familiar with agile software development principles and I am an active learner. I try to get an analytical result with my analytical thinking skills and technology in the problems I encounter.",
      imageSource: "/img/arif.jpeg",
      cvSource: "/cv/arif.pdf",
      links: {
        gitlab: "https://gitlab.com/arifsisman",
        github: "https://github.com/arifsisman",
        bitbucket: "https://bitbucket.org/arifsisman",
        medium: "https://medium.com/@arifsisman",
        linkedin: "https://www.linkedin.com/in/mustafaarifsisman"
      },
    },
  ],

  contributorList: [
  ]
}
