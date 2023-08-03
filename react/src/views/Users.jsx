import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

function Users() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  },[]);

  const onDelete = (user) => {
    if(!window.confirm("Are your sure to delete...?")){
      return 
    }

    axiosClient.delete(`/users/${user.id}`)
    .then( () => {
      setNotification("User Deleted Successfully....!!!");
      getUsers();
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
    .then(({data}) => {
      setLoading(false)
      console.log(data)
      setUser(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/user/new" className='btn-add'>Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className='text-center'>
                <h2>Loading.........</h2>
              </td>
            </tr>
          </tbody>}
          {!loading && <tbody>
            {users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link className='btn-edit' to={'/user/'+user.id}>Edit</Link>
                  &nbsp;
                  <button onClick={e => onDelete(user)} className='btn-delete'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}

export default Users