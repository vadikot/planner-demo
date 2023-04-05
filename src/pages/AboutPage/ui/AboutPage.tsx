import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/components/Auth/lib/AuthConext';
import '../../ContactPage/ui/ContactPage.scss';

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
                    <br />
                    <br />
                    <div className="info__users">
                        you can register your user or use one of the already created users with data.
                        <br />
                        <p className="text-green">first user:</p>
                        <div className="user__info">
                            <p>email: admin@gmail.com</p>
                            <p>password: 1234</p>
                        </div>
                        <p className="text-green">second user:</p>
                        <div className="user__info">
                            <p>email: user@gmail.com</p>
                            <p>password: 1234</p>
                        </div>
                    </div>
                    <h2 className="info__text red" style={{ paddingTop: '30px' }}>
                        Developed by
                        {' '}
                        <a href="https://www.linkedin.com/in/vadikot/?locale=en_US">Vadim Kotsia</a>
                    </h2>
                    <h2 className="info__text" style={{ paddingTop: '30px' }}>
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
