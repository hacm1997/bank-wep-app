'use client'

import { useRouter } from 'next/navigation'
import { SingupFormModel, validateSignupSchema } from './signup.model'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSignup } from '@/libs/shared/api/auth'
import { ErrorMessage } from '@hookform/error-message';

export default function Signup() {
    const router = useRouter()

    const methods = useForm<SingupFormModel>({
        mode: 'all',
        defaultValues: {
            userNameEmail: '',
            password: '',
        },
        resolver: zodResolver(validateSignupSchema),
    });
    const {
        formState: { isValid, errors },
        watch,
        handleSubmit,
    } = methods;

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');


    const handleSingup = async (data: SingupFormModel) => {
        try {
            await authSignup(data.userNameEmail, data.password)
            alert('Registro exitoso!')
            router.push('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[95vh]">
                <h1 className='font-bold text-[32px] py-6'>BankApp Managment</h1>
                <div className="flex justify-center w-[80%] md:w-[70%] xl:w-[25%] rounded-[8px] transition-all duration-75 hover:shadow-cyan-glow bg-[#1A1E28] ">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleSingup)} className="flex flex-col gap-4 w-full p-8">
                            <h2 className='text-center text-[24px] pb-2 font-semibold'>Registro de usuario</h2>
                            <input
                                className="h-[40px] bg-transparent border-[1px] border-[#9233E9] p-2 rounded-md"
                                type="text"
                                placeholder="Email o username"
                                {...methods.register('userNameEmail')}
                                required
                            />
                            <ErrorMessage
                                errors={errors}
                                name="userNameEmail"
                                render={({ message }) => (
                                    <span
                                        style={{ color: '#F87171', fontSize: '12px', marginTop: '0px' }}
                                    >
                                        {message}
                                    </span>
                                )}
                            />
                            <input
                                className="h-[40px] bg-transparent border-[1px] border-[#9233E9] p-2 rounded-md"
                                type="password"
                                placeholder="Contraseña"
                                {...methods.register('password')}
                                required
                            />
                            {!errors.password && watch('password')?.length >= 8 && (
                                <span
                                    style={{ color: '#65A30D', fontSize: '12px', marginTop: '5px' }}
                                >
                                    Contraseña válida
                                </span>
                            )}
                            {errors.password && watch('password')?.length >= 8 ? (
                                <span
                                    style={{ color: '#F87171', fontSize: '12px', marginTop: '5px' }}
                                >
                                    Contraseña inválida
                                </span>
                            ) : (
                                <>
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ message }) => (
                                            <span
                                                style={{
                                                    color: '#F87171',
                                                    fontSize: '12px',
                                                    marginTop: '0px',
                                                }}
                                            >
                                                {message}
                                            </span>
                                        )}
                                    />
                                </>
                            )}
                            <input
                                className="h-[40px] bg-transparent border-[1px] border-[#9233E9] p-2 rounded-md"
                                type="password"
                                placeholder="Contraseña"
                                {...methods.register('confirmPassword')}
                                required
                            />
                            <ErrorMessage
                                errors={errors}
                                name="confirmPassword"
                                render={({ message }) => (
                                    <span
                                        style={{ color: '#F87171', fontSize: '12px', marginTop: '0px' }}
                                    >
                                        {message}
                                    </span>
                                )}
                            />
                            {!errors.confirmPassword &&
                                password &&
                                confirmPassword &&
                                password === confirmPassword && (
                                    <span
                                        style={{ color: '#65A30D', fontSize: '12px', marginTop: '5px' }}
                                    >
                                        Las contraseñas coinciden
                                    </span>
                                )}
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="w-full cursor-pointer font-semibold h-[40px] bg-[#9233E9] text-white rounded-md mt-2 transition-all duration-150 hover:bg-[#6b24ad]"
                            >
                                Registrarme
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </div>

        </>
    )
}
