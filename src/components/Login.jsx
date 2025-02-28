import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [error, setError] = useState('');

    const login = async(data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#A6C36F] to-[#828C51]
        p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md
            border border-[#828C51]">
                <div className="mb-8 flex justify-center">
                    <span className="inline-block w-full max-w-[140px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-[#335145] mb-2">
                    Welcome back
                </h2>
                <p className="text-center text-[#828C51] mb-8">
                    Don't have an account?{" "}
                    <Link to='/signup' className="text-[#335145] hover:text-[#828C51] font-medium">
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200
                    text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <Input
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        {...register('password', {
                            required: true,
                        })}
                    />

                    <Button
                        type='submit'
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login