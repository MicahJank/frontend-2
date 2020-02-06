import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { fetchAdmins, addWorker } from '../actions';
import axiosWithAuth from '../utils/axiosWithAuth';

const AdminDash = (props, state) => {

    const [admins, setAdmins] = useState({
        name: '',
    })
    const [newWorker, setNewWorker] = useState({
        name: '',
        work_exp: '',
        skills: '',
        availability: ''
    })
    useEffect(() => {
        props.fetchAdmins()
        
    },[]);

    const handleChange = event => {
        setNewWorker({...newWorker, [event.target.name]: event.target.value});
        
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(newWorker);
        addWorker(newWorker);
    }
    
   return <div>admin dashboard
            
            <div>
            {!props.admins && !props.isLoading && (<h2> hello admin </h2>)}
                {props.isLoading && (
                    <h1>Fetching data...</h1>
                )}
                {console.log(props, 'props from admin card')}

                <h2>Admins</h2>
                {props.admins && !props.isLoading && <h2>{props.admins.map(obj =>{return (<p> {obj.name}, {obj.username}, {obj.prison_name}</p>)})}</h2>}
            </div>
            <div>
                <h2>Add Worker</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input 
                        type="text" 
                        name="name"
                        onChange={handleChange}/>
                    </label>
                    <br/>
                    <label>Experience:
                        <input
                        type="text" 
                        name="work_exp"
                        onChange={handleChange}/>
                    </label> 
                    <br/>
                    <label>Skills:
                        <input
                        type="text" 
                        name="skills"
                        onChange={handleChange}/>
                    </label>
                    <br/>
                    <label>Availability:
                        <input
                        type="text" 
                        name="availability"
                        onChange={handleChange}/>
                    </label>
                    <br/>
                    <button type="submit">Submit</button>
                </form>

                <h2>Delete Worker</h2>
                <h2>Update Worker</h2>
            </div>

        </div>
}

const mapStateToProps = state => {
    console.log(state, "state from mapStateToProps");
    return{
        isLoading: state.isLoading,
        admins: state.admins,
        error: state.error
    }
}

export default connect(mapStateToProps, {fetchAdmins, addWorker})(AdminDash);