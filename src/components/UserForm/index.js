import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Validate from './Validate'

UserForm.propTypes = {
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
};

UserForm.defaultProps = {
    onSubmit: null,
    onUpdate: null,
}

function UserForm(props) {

    const { userToEdit, onSubmit, onUpdate } = props;

    const [user, setUser] = useState({
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
    const [errors, setErrors] = useState({});

    const handleCheckbox = (id) => {
        setUser(prevUser => {
            const isChecked = prevUser.courses.includes(id);
            const newCourse = isChecked ? prevUser.courses.filter(item => item !== id) : [...prevUser.courses, id];
            return {
                ...prevUser,
                courses: newCourse
            }
        });
    }

    const isValid = () => {
        setErrors(Validate(user));
        return Object.keys(errors).length > 0 ? false : true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit || !isValid()) return;

        onSubmit(user);

        // Reset form
        setUser({
            id: null,
            name: '',
            dob: '',
            gender: 'male',
            phone: '',
            email: '',
            address: '',
            description: '',
            courses: [],
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!onUpdate) return;
        onUpdate(user);

        // Reset form
        setUser({
            id: null,
            name: '',
            dob: '',
            gender: 'male',
            phone: '',
            email: '',
            address: '',
            description: '',
            courses: [],
        });
    }

    useEffect(() => {
        setUser(userToEdit);
    }, [userToEdit]);

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <div className="desc">It's quick and easy ❤️</div>
                <div className="spacer"></div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label label-required">Name</label>
                    <input
                        value={user.name}
                        onChange={e => setUser({ ...user, name: e.target.value })}
                        placeholder="Enter name"
                        autoComplete="off"
                        className="form-control" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="gender" className="form-label label-required">Gender</label>
                    <div className="form-wrap">
                        <div className="form-item">
                            <input
                                onChange={() => setUser({ ...user, gender: 'male' })}
                                type="radio"
                                name="gender"
                                value="Male"
                                id="male"
                                checked={user.gender === 'male'} />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-item">
                            <input
                                onChange={() => setUser({ ...user, gender: 'female' })}
                                type="radio"
                                name="gender"
                                value="Female"
                                id="female"
                                checked={user.gender === 'female'} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dob" className="form-label label-required">Date of Birth</label>
                    <input
                        value={user.dob}
                        onChange={e => setUser({ ...user, dob: e.target.value })}
                        type="date"
                        name="date"
                        className="form-control" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-label label-required">Phone number</label>
                    <input
                        value={user.phone}
                        onChange={e => setUser({ ...user, phone: e.target.value })}
                        name="phone"
                        placeholder="Enter phone number"
                        autoComplete="off"
                        className="form-control" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label label-required">Email</label>
                    <input
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        name="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        className="form-control" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="address" className="form-label label-required">Address</label>
                    <select
                        value={user.address}
                        onChange={e => setUser({ ...user, address: e.target.value })}
                        className="form-control">
                        <option value="">-- Address --</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Hà Đông">Hà Đông</option>
                        <option value="Hà Tây">Hà Tây</option>
                        <option value="Hà Nam">Hà Nam</option>
                        <option value="Hà Bắc">Hà Bắc</option>
                    </select>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        value={user.description}
                        onChange={e => setUser({ ...user, description: e.target.value })}
                        name="description"
                        rows="8">
                    </textarea>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="level" className="form-label">Courses</label>
                    <div className="form-wrap">
                        <div className="form-item">
                            <input
                                onChange={() => handleCheckbox('HTML')}
                                checked={user.courses.includes('HTML')}
                                type="checkbox"
                                name="courses"
                                value="HTML"
                                id="HTML" />
                            <label htmlFor="HTML">HTML</label>
                        </div>
                        <div className="form-item">
                            <input
                                onChange={() => handleCheckbox('CSS')}
                                checked={user.courses.includes('CSS')}
                                type="checkbox"
                                name="courses"
                                value="CSS"
                                id="CSS" />
                            <label htmlFor="CSS">CSS</label>
                        </div>
                        <div className="form-item">
                            <input
                                onChange={() => handleCheckbox('JS')}
                                checked={user.courses.includes('JS')}
                                type="checkbox"
                                name="courses"
                                value="JS"
                                id="JS" />
                            <label htmlFor="JS">JS</label>
                        </div>
                    </div>
                </div>
                <div className="group-btn">
                    <button
                        className={user.id ? 'btn btn-inactive' : 'btn btn-active'}
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleUpdate}
                        className={user.id ? 'btn btn-active' : 'btn btn-inactive'}
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;