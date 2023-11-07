import { useState } from 'react';
import google from '../assets/google.png';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { toast } from 'react-toastify';


const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      createUserWithEmailAndPassword(auth, email, pass).catch((err) =>
        toast.error(err.code)
      );
    } else {
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        toast.error(err.code);
        if (err.code === 'auth/wrong-password') {
          setIsError(true);
        }
      });
    }
  };

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info('Lütfen Mailinizi kontrol edin.'))
      .catch((err) => toast.error(err.code));
  };

  const handleGoogle = () => {
    signInWithRedirect(auth, provider).catch((err) =>
      toast.error(err)
    );
  };

  return (
    <div className="h-[100vh] bg-zinc-800 grid place-items-center">
    <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
      <div className="flex justify-center">
        <img className="h-[60px]" src="/x-logo.png" alt="" />
      </div>

      <h1 className="text-center font-bold text-xl">
        Log in to Twitter
      </h1>

      <div
          onClick={handleGoogle}
          className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200"
        >
          <img className="h-[20px]" src={google} />
          <p className="whitespace-nowrap">Sign in with Google</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48] outline"
            type="email"
          />

          <label className="mt-5">Password</label>
          <input
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48] outline"
            type="password"
          />

          <button
            className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-200"
            type="submit"
          >
            {signUp ? 'Kaydol' : 'Giriş Yap'}
          </button>

          <p className="text-gray-500 mt-5">
            <span>Don't have an account?</span>
            <button
              onClick={() => setSignUp(!signUp)}
              className="mx-3 text-blue-500"
              type="button"
            >
              {signUp ? 'Giriş Yap' : 'Kaydol'}
            </button>
          </p>

          {!signUp && isError && (
            <button
              type="button"
              className="text-red-400 mt-5"
              onClick={handleReset}
            >
              Did you forget password?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth