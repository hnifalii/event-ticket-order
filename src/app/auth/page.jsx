"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const EyeIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
  </svg>
);

const EyeOffIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.828c-1.554 1.156-3.35 1.776-5.275 1.776H4.5A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75h4.125c1.925 0 3.721.62 5.275 1.776m-5.275 1.156A3.75 3.75 0 1018.75 12.375M12 18V6m-1.5 6L12 9l1.5 3"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21L3 3"></path>
  </svg>
);

const PasswordToggleInput = ({ label = "Password", name = "password", value, onChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prev => !prev);
    const inputType = isVisible ? 'text' : 'password';

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative mt-1">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
                />
                
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
                >
                    {isVisible ? (
                        <EyeOffIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <p className="ml-3 text-white font-semibold">Memproses data...</p>
    </div>
);

export default function LoginCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Username atau password salah!");
            setLoading(false);
            router.push('/auth');
            router.refresh();
        } else {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-t-[#f72585] transition duration-300">
                
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-[#7209b7]">
                        Selamat Datang!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Masuk ke akun panitia Anda
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-[#7209b7] focus:outline-none focus:ring-2 focus:ring-[#7209b7] sm:text-sm transition duration-150"
                            />
                        </div>
                    </div>

                    <PasswordToggleInput
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 bg-[#f72585] border border-transparent rounded-md shadow-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-100 transform hover:scale-[1.005] active:opacity-80 disabled:bg-gray-600"
                        >
                            {!loading ? 'Log In' : <LoadingSpinner/>}
                        </button>
                    </div>

                </form>

                <div className="mt-6">
                    <p className="text-center text-xs text-gray-400">
                        Hanya untuk penggunaan internal panitia.
                    </p>
                </div>
            </div>
        </div>
    );
}