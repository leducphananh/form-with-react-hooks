import React from 'react';
import PropTypes from 'prop-types';

UserList.propTypes = {
    users: PropTypes.array,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
};

UserList.defaultProps = {
    users: [],
    onEditClick: null,
    onDeleteClick: null,
}

function UserList(props) {

    const { users, onEditClick, onDeleteClick } = props;

    const handleEditClick = (user) => {
        if (onEditClick) {
            onEditClick(user);
        }
    }

    const handleDeleteClick = (user) => {
        if (onDeleteClick) {
            onDeleteClick(user);
        }
    }

    return (
        <div className="data">
            <h2>List Users</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Courses</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.description}</td>
                            <td>{user.courses.join(', ')}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)} className="btn-control btn-control--edit">Edit</button>
                                &nbsp;&nbsp;
                                <button onClick={() => handleDeleteClick(user)} className="btn-control btn-control--delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;