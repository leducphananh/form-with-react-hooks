import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {

  const [users, setUsers] = useState(() =>
    localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
  )

  const [userToEdit, setUserToEdit] = useState({
    id: null,
    name: '',
    gender: 'male',
    dob: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    courses: [],
  });

  const hadId = (id) => {
    return users.some(user => user.id === id);
  }

  const getUserById = (id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) return users[i];
    }
    return null;
  }

  const handleSubmit = (user) => {
    // Random id
    let id = Math.floor(Math.random() * 1000);
    while (hadId(id)) {
      id = Math.floor(Math.random() * 1000);
    }
    // Init new user
    const newUser = {
      ...user,
      id
    }
    // New list user
    const newUsers = [
      ...users,
      newUser
    ]
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
  }

  const handleDeleteClick = (user) => {
    const index = users.indexOf(user);
    if (index < 0) return;
    // New list user
    const newUsers = [...users];
    // Delete user in index
    newUsers.splice(index, 1);
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
  }

  const handleUpdate = (user) => {
    const newUsers = [...users];
    const userToUpdate = getUserById(user.id);
    const index = users.indexOf(userToUpdate);
    newUsers[index] = user;
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
    setUserToEdit({
      id: null,
      name: '',
      gender: 'male',
      dob: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      courses: [],
    })
  }

  const handleEditClick = (user) => {
    setUserToEdit(user);
  }

  return (
    <div className="main">
      <UserForm
        userToEdit={userToEdit}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
      />

      <UserList
        users={users}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

export default App;
