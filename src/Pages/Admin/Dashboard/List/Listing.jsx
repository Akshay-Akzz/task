import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from '../../../../common/DeleteModal'

const Listing = () => {

    const [datas, setDatas] = useState([]);
    const [status, setStatus] = useState('all');
    const [filter, setFilter] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setStatus(value);

        const filtered = datas.filter((item) => {
            if (value === 'all') return true;
            return value === 'completed' ? item.completed : !item.completed;
        });
        setFilter(filtered);
    };

    const handleDelete = () => {
        if (deleteItem !== null) {
            const deleteData = datas.filter((item) => item.id !== deleteItem);
            setDatas(deleteData);
            setFilter(deleteData);
            setConfirm(false);
        }
    };
    const showModal = (id) => {
        setDeleteItem(id);
        setConfirm(true);
    };

    const data = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setDatas(res.data);
            setFilter(res.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        data()
    }, [])



    return (
        <div className='row'>
            <div className='d-flex justify-content-between p-3'>
                <div className='ps-5'>
                    <select
                        className='form-select'
                        onChange={handleChange}
                        value={status}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <Link to='/dashboard/addlist'>
                    <button className="btn btn-dark text-light">Add List</button>
                </Link>
            </div>
            <div className='p-3 px-5'>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filter ? filter.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{item?.id}</th>
                                    <td>{item?.title}</td>
                                    <td>
                                        <button className={`${item?.completed == true ? "btn-success" : "btn-secondary"} btn`}>{item?.completed == true ? "Completed" : "Pending"}</button>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                            <Link to={`/dashboard/editlist/${item.id}`} >Edit</Link>
                                            <a onClick={() => showModal(item.id)} className="ps-3">Delete</a>
                                            {/* <a onClick={() => handleDelete(item.id)} className="ps-3">Delete</a> */}
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : ''}
                    </tbody>
                </table>
            </div>
            <DeleteModal confirm={confirm} setConfirm={setConfirm} onDelete={handleDelete} />
        </div>
    )
}

export default Listing