import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

const Register = () => {


    const schema = z.object({
        email: z.string().min(4, 'Email Required').email('This is not valid email'),
        password: z.string().min(4, 'password Required'),
    })
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
    });

    const submitData = async (data) => {
        try {
            const resp = await axios.post('https://reqres.in/api/register', data);
            reset()
        } catch (error) {
            console.error('Error registering', error.resp.data);
        }
    }


    return (
        <div className='p-3 w-100'>
            <form action="" onSubmit={handleSubmit(submitData)}>
                <div className="form-floating mb-3">
                    <input type="email" className={`${errors.email ? "is-invalid" : ""} form-control`} id="floatingemail" placeholder="" {...register("email")} />
                    <label >Enter Email</label>
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
                <div className="form-floating">
                    <input type="password" className={`${errors.password ? "is-invalid" : ""} form-control`} id="floatingpassword" placeholder="name@example.com" {...register("password")} />
                    <label >Enter Password</label>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>
                <div className='py-3'>
                    <button type='submit' className='btn btn-secondary w-100'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register