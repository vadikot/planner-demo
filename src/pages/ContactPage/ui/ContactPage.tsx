import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import './ContactPage.scss';

const ContactPage = () => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const startHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (isAuth) {
            navigate('/dashboard/home');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="contact__page">
            <div className="contact__page__wrap">
                <div className="links">
                    <div className="logo">
                        <div />
                        <div />
                        <div />
                    </div>
                    <Link
                        className="homepage__link"
                        to="/"
                        onClick={startHandler}
                    >
                        Start
                    </Link>
                    <Link className="homepage__link" to="/about">About</Link>
                    <Link className="homepage__link" to="/contact">Contact</Link>
                </div>
                <div className="info">
                    <h2 className="info__text">
                        This is a demo version. updates coming soon...
                    </h2>
                    <h2 className="info__text red">
                        Developed by
                        {' '}
                        <a href="https://www.linkedin.com/in/vadikot/?locale=en_US">Vadim Kotsia</a>
                    </h2>
                    <h2 className="info__text">
                        Back to
                        {' '}
                        <a href="/">homepage</a>
                    </h2>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
