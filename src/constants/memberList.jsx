import React from 'react'

export const MEMBER_LIST = {
    teamMemberList: [
        {
            name: 'Mehmet Arif Emre Sen',
            description: (
                <>
                    <ul>
                        <li>
                            I am an entrepreneur who wants to learn new
                            technologies and use them to make things easier.
                        </li>
                        <li>
                            My life goal is having my own job and creating a
                            software community that everyone can get benefit
                            from.
                        </li>
                        <li>
                            I have deep interest to Object Oriented Paradigm
                        </li>
                    </ul>
                    <hr />
                    <a
                        className='d-block text-center'
                        href='https://maemresen.github.io/curriculum-vitae/cv_mehmet_arif_emre_sen.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <b>CV Link</b>
                    </a>
                </>
            ),
            imageSource: '/img/emre_portrait_cropped.jpeg',
            title: 'Major Contributor',
            links: {
                gitlab: 'https://gitlab.com/emresen',
                github: 'https://github.com/maemresen',
                medium: 'https://medium.com/@maemresen',
                linkedin: 'https://www.linkedin.com/in/maemresen'
            }
        },

        {
            name: 'Burak Erkan',
            description: (
                <div>
                    <span>yazilim.vip patriot</span>
                    <ul>
                        <li>
                            2008 - now (software developer & team lead &
                            manager)
                        </li>
                        <li>2000 - now (still a software amateur)</li>
                    </ul>
                </div>
            ),
            imageSource: '/img/burak.jpeg',
            // cvSource: "/cv/burak.pdf",
            title: 'Major Contributor'
        },

        {
            name: 'Mustafa Arif Sisman',
            title: 'Major Contributor',
            description: (
                <>
                    <ul>
                        <li>
                            I aim to achieve the most automated and optimized
                            result possible, following the principles of agile
                            software development and analytical thinking.
                        </li>
                        <li>
                            I work in the field of artificial intelligence and
                            web technologies, I am an active learner.
                        </li>
                    </ul>
                </>
            ),
            imageSource: '/img/arif.jpeg',
            cvSource: 'https://arifsisman.github.io',
            links: {
                gitlab: 'https://gitlab.com/arifsisman',
                github: 'https://github.com/arifsisman',
                medium: 'https://medium.com/@arifsisman',
                linkedin: 'https://www.linkedin.com/in/mustafaarifsisman'
            }
        }
    ],

    contributorList: []
}
