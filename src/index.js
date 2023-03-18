import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App'
import './index.css'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
)