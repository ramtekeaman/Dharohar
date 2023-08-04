import React from 'react'
import logo from './images/logo.png'
import './css/Header.css'
import {
    Link
  } from "react-router-dom";

export default function Header() {
  return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid nav" style={{padding:'0px'}}>
                <Link to="/" class="navbar-brand ms-5 logoname" href="#">𝓐𝓻𝓬𝓱𝓪𝓮𝓸𝓼𝓱𝓸𝓹</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse nav_menu" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link className="nav-link active ms-3" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active ms-3" aria-current="page" href="#">Gallery</a>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link active ms-3" to="/Dashboard">Pannel</Link>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active ms-3" aria-current="page" href="#">Contact</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active ms-3" aria-current="page" href="#">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
