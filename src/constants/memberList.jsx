import React from 'react';

export const members = {
  teamMemberList: [
    {
      name: "Mehmet Arif Emre Sen",
      description: (
        <>
          <a className="d-block text-center" href="https://maemresen.github.io/resume/cv_mehmet_arif_emre_sen.pdf" target="_blank" rel="noopener noreferrer">
            <b>
              Resume Link
            </b>
          </a>
          <hr />
          <ul>
            <li>
              I am an entrepreneur who wants to learn new technologies and use them to make things easier.
            </li>
            <li>
              My life goal is having my own job and creating a software community that everyone can get benefit from.
            </li>
            <li>
              I have deep interest to Object Oriented Paradigm
            </li>
          </ul>

        </>
      ),
      imageSource: "/img/emre_portrait_cropped.jpeg",
      title: "Major Contributor",
      links: {
        gitlab: "https://gitlab.com/emresen",
        github: "https://github.com/maemresen",
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
