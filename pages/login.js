// Next JS related
import Head from 'next/head';
import { useRouter } from 'next/router';

// Firebase related
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebase } from '../app/firebaseApp';
import { uiConfig } from '../config/firebaseAuthUI.config';

// // Components
// import Logo from '../components/elements/Logo';
// import Card from '../components/elements/Card';
// import Error from '../components/elements/Error';
// import Loading from '../components/elements/Loading';

// // Styles
// import LoginStyle from '../styles/Login.module.css';


export default function Login() {
    const [user, loading, error] = useAuthState(firebase.auth);
    const router = useRouter();

    if (loading) return <Loading />
    else if (error) return <Error msg={error} />

    else if (user) {
        // user is already logged in, redirect to home page
        router.push('/');
    }

    const authConfig = uiConfig(firebase);

    return (
        <>
            <Head>
                <title>CodeBlog | LogIn</title>
            </Head>
            <div>
                <Card>
                    <div>
                        <h1>Log In to</h1>
                    </div>
                    <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
                </Card>
            </div>
        </>
    )
}