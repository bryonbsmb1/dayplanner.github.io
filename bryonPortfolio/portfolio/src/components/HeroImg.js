import "./HeroImgStyles.css";

import React from 'react'

import IntroImg from "../assets/coding-man.jpg"
import { Link } from "react-router-dom";

const HeroImg = () => {
  return (
    <div className="hero">
        <div className="mask">
        <img className="intro-img"
        src={IntroImg} alt="IntroImg" />

    </div>

    <div className="content">
        <p>HELLO, I'M BRYON, NICE TO MEET YOU. </p>
        <h1>Full Stack Web Developer.</h1>
    <div>

        <Link to="/project"
        className="btn">Projects</Link>
        <Link to="/contact"
        className="btn-light">Contact</Link>

    </div>

    </div>
    
    </div>


    
  );
};

export default HeroImg;