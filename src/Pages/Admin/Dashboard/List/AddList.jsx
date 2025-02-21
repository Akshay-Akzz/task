import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

const AddList = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    const [check, setCheck] = useState(false)

    const schema = z.object({
        title: z.string().min(1, 'Title Required'),
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleToggle = () => {
        setCheck(!check)
    }

    const submitData = async (data) => {
        const datas = { ...data, completed: check };
        try {
            if (id) {
                const resp = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, datas);
                console.log(resp.data);
            } else {
                const resp = await axios.post('https://jsonplaceholder.typicode.com/todos', datas);
                console.log(resp.data);
            }
            navigate('/dashboard/list');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    useEffect(() => {
        if (id) {
            axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(response => {
                    console.log(response.data);

                    const { title, completed } = response.data;
                    setValue('title', title);
                    setCheck(completed);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [id, setValue]);

    return (
        <div className='container-fluid'>
            <div className='row card'>
                <h3 className='py-4 px-3'>{id ? "Edit List" : "Add List"}</h3>
                <span className="border border-light"></span>
                <form action="" onSubmit={handleSubmit(submitData)}>
                    <div className='row g-2 py-4'>
                        <div className="form-floating mb-3 col-lg-4">
                            <input type="text" className={`${errors.title ? "is-invalid" : ""} form-control`} id="floatingInput" placeholder="" {...register("title")} />
                            <label >Enter Title</label>
                            {errors.title && <span className='text-danger'>{errors.title.message}</span>}
                        </div>
                        <div className="form-switch mb-3 col-lg-4 text-center">
                            <h6>Completed</h6>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                role="switch"
                                checked={check}
                                onChange={handleToggle}
                            />
                            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className="py-3">
                        <button className='btn btn-success' type='submit'>{id ? "Edit List" : "Add List"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddList