import React, { Component } from 'react'
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Positioner = styled.div`
    position: absolute:
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    `;

    const Contents = styled.div`

    background: white;
    padding:2rem;
    height:auto;
    `;


const AuthWrapper = ({children}) => (
    <div>

           {children}

    </div>
);

export default AuthWrapper;
