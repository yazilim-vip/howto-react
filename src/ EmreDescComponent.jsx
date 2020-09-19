import { faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";


class EmreDescComp extends React.Component {

    constructor(props) {
        super()
        this.state = {
            show: false
        }
        console.log('here')
    }

    closeModal = () => this.setState({ show: false });
    showModal = () => this.setState({ show: true });

    render = () => {
        return (
            <div>

                <span>
                    I am an entrepreneur who wants to learn new technologies and use them to make things easier. My life goal is having my own job and creating a software community that everyone can get benefit from. I have deep interest to Object Oriented Paradigm
                </span>
                <hr />

                <Button variant="warning" onClick={this.showModal}>
                    <FontAwesomeIcon icon={faFile} className="mr-3" />
                     Resume
                </Button>

                <Modal
                    show={this.state.show} on
                    Hide={this.closeModal}
                    backdrop="static"
                    dialogClassName="modal-90w"

                >
                    <Modal.Header closeButton>
                        <FontAwesomeIcon icon={faDownload} />
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor: "#eee"
                    }}>
                        <div className="cv-wrapper">
                            <div className="container">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-title">
                                            Mehmet Arif Emre Şen
            </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                Personal Info
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    <div className="row">
                                                        <div className="col-lg-9 col-md-7">
                                                            <ul className="cv-item-list">
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Phone
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> Contact me through gmail if needed
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                E-mail
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> maemresen07@gmail.com
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Gender
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> Male
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Birth Place/Date
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> Bandırma/25.08.1997
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Martial Status
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> Single
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Nationality
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> Turkish
                                    </div>
                                                                    </div>
                                                                </li>
                                                                <li className="cv-item">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-sm-5">
                                                                            <span className="cv-item-title">
                                                                                Driver License
                                       </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-sm-7">
                                                                            <span className="d-none d-sm-inline">:</span> B
                                    </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-lg-3 col-md-5 d-none d-md-block d-print-block">
                                                            <div className="cv-img-wrapper">
                                                                <img src="assets/img/portre.png" className="img-fluid" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                About Me
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    I am a Computer Science Engineering undergraduate student who wants to learn new
                                                    technologies and use them to make things easier...
                  </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                Educations
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    <ul className="cv-item-list">
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-md-3 col-print-3">
                                                                    <span className="cv-item-title">Under Graduate</span>
                                                                </div>
                                                                <div className="col-md-9 col-print-9">
                                                                    <span className="d-none d-md-inline">:</span>
                                                                    <span className="cv-item-title">Akdeniz University Antalya</span>
                                                                    <div>
                                                                        Computer Science Engineering – 2015 — On Going
                                 </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-md-3 col-print-3">
                                                                    <span className="cv-item-title">High School</span>
                                                                </div>
                                                                <div className="col-md-9 col-print-9">
                                                                    <span className="d-none d-md-inline">:</span>
                                                                    <span className="cv-item-title">Antalya High School Antalya</span>
                                                                    <div>
                                                                        Matematik-Fen – 2011 – 2015
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
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                Programming Languages
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    <ul className="cv-item-list">
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Basic
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Assembly, Visual Basic, TeX, Python
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Intermediate
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Bash Script, C, C++, PHP, XML, JavaScript, HTML5, CSS3
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Advanced
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Java
                              </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                Other Skills
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    <ul className="cv-item-list">
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        IDE
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Eclipse, Spring Tool Suite (STS), Intellij Idea, Intellij Phpstorm, Netbeans
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Database Management
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> SQL, MySQL, phpmyadmin, <br />&nbsp;&nbsp;<b>ORM :</b> JDBC, MyBatis, Hibernate
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        System Management
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Maven, Composer, SVN, GIT, Jenkins, JavaDoc, Tomcat, CPANEL
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Web Technologies
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Hybrid Mobile Apps (Phonegap, Cordova), AJAX, JSP, JSTL, Bootstrap
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Technologies
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> JavaFX, Spring Web-MVC, Spring Boot, RESTful Web Service, micro service, NodeJS
                              </div>
                                                            </div>
                                                        </li>
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        Computer Skills
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> Office Apps; (Linux Terminal), Windows CMD; Effective Search Engine Usage
                              </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="cv-section">
                                            <div className="cv-section-title">
                                                Languages
               </div>
                                            <div className="cv-section-content">
                                                <ul className="cv-item-list">
                                                    <ul className="cv-item-list">
                                                        <li className="cv-item">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <span className="cv-item-title">
                                                                        English
                                 </span>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <span className="d-none d-sm-inline">:</span> <b>Reading :</b> good, <b>Writing :</b> good, <b>Speaking :</b> good
                              </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </ul>
                                            </div>
                                        </div>
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
                    </Modal.Body>
                    <Modal.Footer className="pull-left">
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EmreDescComp