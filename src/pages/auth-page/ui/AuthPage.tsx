import {useState} from "react";
import {LoginForm} from "../../../features/auth/ui/LoginForm/LoginForm.tsx";
import RegisterForm from "../../../features/auth/ui/RegisterForm/RegisterForm.tsx";

const AuthPage = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <main>
                {mode === 'login' ? <LoginForm setMode={setMode} /> : <RegisterForm setMode={setMode} />}
            </main>
        </div>
    );
};

export default AuthPage;