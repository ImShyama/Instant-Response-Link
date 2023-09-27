import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const UserData = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/getalluser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json()
    setUsers(json.clients)
    console.log(json);
  }

  const updateUserApproval = async (_id) =>{
    const response = await fetch(`http://localhost:5000/api/auth/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id:_id})
    });
    const json = await response.json()
    setUsers(json.clients)
    console.log(json);
  }

  const handleApproval = async (_id) => {
    await updateUserApproval(_id)
    // dispatch(getAllUsersClientPage({ name: "" }))
    // dispatch(setValue(us))
  };

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      UserData()
    } else {
      navigate('/admin')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      {/* <caption>List of users</caption> */}
      <div class="table-responsive" style={{ background: '#fff' }}>
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Approved</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.approved}
                    onChange={() => handleApproval(user._id)}
                    className="form-check-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users