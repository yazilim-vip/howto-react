
import React from 'react'


const Cv = () => {

    const title = "Mehmet Arif Emre Şen"

    /* Definitions */
    const ABOUT_ME = `I am a Computer Science Engineering undergraduate student who wants to learn new
            technologies and use them to make things easier...
        `

    /*- Personal Info --------------------------------------*/
    const personalInfo = {
        "Phone": "Contact me through gmail if needed",
        "E-mail": "maemresen07@gmail.com",
        "Gender": "Male",
        "Birth Place/Date": "Bandırma/25.08.1997",
        "Martial Status": "Single",
        "Nationality": "Turkish",
        "Driver License": "B"
    }

    const getPersonalInfoSection = () => (
        <div class="row">
            <div class="col-lg-9 col-md-7">
                <ul class="cv-item-list">
                    {Object.keys(personalInfo).map(field => {
                        let value = personalInfo[field]
                        return (
                            <li class="cv-item">
                                <div class="row">

                                    <div class="col-lg-4 col-sm-5">
                                        <span class="cv-item-title">
                                            {field}
                                        </span>
                                    </div>
                                    <div class="col-lg-8 col-sm-7">
                                        <span class="d-none d-sm-inline">:</span> {value}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div class="col-lg-3 col-md-5 d-none d-md-block d-print-block">
                <div class="cv-img-wrapper">
                    <img src="assets/img/portre.png" class="img-fluid" alt="" />
                </div>
            </div>
        </div>
    )


    /*- Skills --------------------------------------*/
    const programmingLanguages = {
        "Basic": ["Assembly", "Visual Basic", "TeX", "Python"],
        "Intermediate": ["Bash Script", "C", "C++", "PHP", "XML", "JavaScript", "HTML5", "CSS3"],
        "Advanced": ["Java"]
    }

    const skills = {
        "IDE": ["Eclipse"
            , "Spring Tool Suite (STS)"
            , "Intellij Idea"
            , "Intellij Phpstorm"
            , "Netbeans"],
        "Database Management": ["SQL"
            , "MySQL"
            , "phpmyadmin"
            , (<><b>ORM :</b>JDBC</>)
            , "MyBatis"
            , "Hibernate"],
        "System Management": ["Maven"
            , "Composer"
            , "SVN"
            , "GIT"
            , "Jenkins"
            , "JavaDoc"
            , "Tomcat"
            , "CPANEL"],
        "Web Technologies": ["Hybrid Mobile Apps (Phonegap, Cordova), AJAX, JSP, JSTL, Bootstrap"],
        "Technologies": ["JavaFX"
            , "Spring Web-MVC"
            , "Spring Boot"
            , "RESTful Web Service"
            , "micro service"
            , "NodeJS"],
        "Computer Skills": ["Office Apps; (Linux Terminal), Windows CMD; Effective Search Engine Usage"],
    }

    const languages = {
        "English": [(<><b>Reading :</b> good, <b>Writing :</b> good, <b>Speaking :</b> good</>)]
    }

    const getSkillsSection = (skills) => {

        return (
            <ul class="cv-item-list">
                {Object.keys(skills).map(key => {
                    let value = skills[key]
                    return (
                        <li class="cv-item">
                            <div class="row">
                                <div class="col-sm-3">
                                    <span class="cv-item-title">
                                        {key}
                                    </span>
                                </div>
                                <div class="col-sm-9">
                                    <span class="d-none d-sm-inline">:</span>
                                    {value.map((el, i) => {
                                        let suffix = ""
                                        if (i < value.length - 1) {
                                            suffix = ","
                                        }
                                        return (
                                            <span>
                                                {el}{suffix}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }


    /*- Education Info --------------------------------------*/

    const TYPE = "type";
    const TITLE = "title";
    const DESC = "desc";

    let ed1 = {}
    ed1[TYPE] = "Under Graduate"
    ed1[TITLE] = "Akdeniz University Antalya"
    ed1[DESC] = "Computer Science Engineering – 2015 — On Going"

    let ed2 = {}
    ed2[TYPE] = "High School"
    ed2[TITLE] = "Antalya High School Antalya"
    ed2[DESC] = "Matematik-Fen – 2011 – 2015"

    const educationList = [ed1, ed2]

    const getEducationSection = () => {
        return (
            <ul class="cv-item-list">
                {
                    educationList.map(education => {
                        console.log()
                        return (
                            <li class="cv-item">
                                <div class="row">
                                    <div class="col-md-3 col-print-3">
                                        <span class="cv-item-title">{education[TYPE]}</span>
                                    </div>
                                    <div class="col-md-9 col-print-9">
                                        <span class="d-none d-md-inline">:</span>
                                        <span class="cv-item-title">{education[TITLE]}</span>
                                        <div>
                                            {education[DESC]}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                    )
                }
            </ul>
        )
    }



    const getSection = (section_title, section_content) => {
        return (
            <div class="cv-section">
                <div class="cv-section-title">
                    {section_title}
                </div>
                <div class="cv-section-content">
                    <ul class="cv-item-list">
                        {section_content}
                    </ul>
                </div>
            </div>
        );


    }

    return (
        <div className="cv-wrapper">
            <div className="container">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-title">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("Personal Info", getPersonalInfoSection())}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("About Me", ABOUT_ME)}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("Education", getEducationSection("Education", educationList))}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("Programming Languages", getSkillsSection(programmingLanguages))}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("Skills", getSkillsSection(skills))}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {getSection("Languages", getSkillsSection(languages))}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-section">
                            <div className="cv-section-title">
                                Work Experience
               </div>
                            <div className="cv-section-content">
                                <ul className="cv-item-list">
                                    <ul className="cv-item-list work-experiences-list">
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="cv-item-title">Akdeniz University BAUM – Antalya</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="cv-item-title float-md-right">08/2016 – ongoing</span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Position</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Java Developer
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Job Description</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Developing Java Web Apps (Spring MVC) with using Spring framework, Providing communication between web apps and database over RESTful Service
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Details</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Compiling applications with Maven, sending them to the SVN environment, serving
                                    them on the Tomcat Server via Jenkins.
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Achievements</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> CSRF Token, Single Sign On (SSo), Java Singleton className, Organazing Pom file, Spring Framework
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="cv-item-title">Front-end Developer</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="cv-item-title float-md-right">06/2016 – 08/2016 (Volunteer)</span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Position</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Java Developer
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Job Description</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Web page design on JSP
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Details</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Web page design using the Bootstrap library with HTML5-CSS3-JavaScript
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Achievements</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <span className="d-none d-md-inline">:</span> Bootstrap, Java Server Page(JSP), JSP Standart Tag Librar(JSTL), HTML-CSS-JavaScript
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-break"></div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-section">
                            <div className="cv-section-title">
                                Studies
                  <span className="d-print-none">
                                    (<a href="javascript:link_update()">Check This Link to see studies in details.</a>)
                  </span>
                            </div>
                            <div className="cv-section-content">
                                <ul className="cv-item-list">
                                    <ul className="cv-item-list work-experiences-list">
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="cv-item-title">Computer Based Assessment System -- ongoing</span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Platform</span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Java
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Description</span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Exam preparation, application and evaluation system in computer environment.
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="cv-item-title">Dues Tracking System – ongoing </span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Platform</span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Java
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Type </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Spring MVC Project
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Description </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Web application to track apartment expenses and associate them with residents
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="cv-item-title">Student Automation </span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Platform </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Java
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Type </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> JavaFX App
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Description </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> JavaFX application for storing information of graduated students in database,
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cv-item">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="cv-item-title">Icon Conference 2017 </span>
                                                </div>
                                            </div>
                                            <div className="item-details">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Platform </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Web
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Type </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Wordpress Theme
                                 </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <span className="cv-item-title">Description </span>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <span className="d-none d-md-inline">:</span> Web application designed for the conference web-site
                                 </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-section">
                            <div className="cv-section-title">
                                Personal Interests
               </div>
                            <div className="cv-section-content">
                                Object Oriented Programming, Database Management, Web-site design, Developing PHP web
                                applications, Developing Wordpress Themes
               </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-section">
                            <div className="cv-section-title">
                                Hobbies
               </div>
                            <div className="cv-section-content">
                                <ul className="cv-item-list">
                                    Playing football, swimming, driving car, jogging, unbrace oneself
                  </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-section">
                            <div className="cv-section-title">
                                Publications
               </div>
                            <div className="cv-section-content">
                                <ol className="publication-list">
                                    <li>
                                        <span className="authors">
                                            Mehmet Karakoç, Alperen Aksoy, Mehmet Arif Emre Şen, and Melih Günay
                        </span>
                                        <span className="year">
                                            2017
                        </span>
                                        <span className="title">
                                            Outcome focused computer based assessment system using intelligent shuffling algorithm
                        </span>
                                        <span className="conferance">
                                            International Conference on Educational Sciences (ICES-UEBK)
                        </span>
                                        <span className="location">
                                            Antalya
                        </span>
                                        <span className="pp">
                                            1459-1460
                        </span>
                                        <span className="links">
                                            <a href="javascript:link_update()">
                                                http://ices-uebk.org/dosyalar/files/ices2017ozetkitabi_v1.pdf
                        </a>
                                            <a href="javascript:link_update()">
                                                http://ices-uebk.org/dosyalar/files/ices2017kongreprogrami.pdf pp. (99)
                        </a>
                                        </span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cv;