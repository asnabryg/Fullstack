/* eslint-disable */
import React, { useState } from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navibar = ({loggedUser, handleLogout}) => {
    console.log('LOGGEDUSER', loggedUser)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="#" as="span">
                        <Link to="/blogs">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">users</Link>
                    </Nav.Link>
                    <p style={{color: "white"}}>{loggedUser} logged in</p>
                    <button onClick={handleLogout}>logout</button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navibar