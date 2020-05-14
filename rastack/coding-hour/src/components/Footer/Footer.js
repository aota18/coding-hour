import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div className="footer-section">
                <div className="container">
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer-text">
                                <div className="ft-logo">
                                    <a href="#" className="footer-logo"><img src="img/footer-logo.png" alt=""></img></a>
                                </div>
                            
                                <div className="copyright-text">
                                <p>
        Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
        </p></div>
                            
                            </div>
                        </div>
                    </div>

            </div>
            </div>
        )
        
    }
}

export default Footer
