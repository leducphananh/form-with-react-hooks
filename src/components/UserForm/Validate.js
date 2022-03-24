export default function Validate(user) {
    let error = {};

    if (user.name !== undefined) {
        error.name = Validate.isRequired(user.name, 'Vui lòng nhập tên');
    }

    if (user.dob !== undefined) {
        error.dob = Validate.isRequired(user.dob, 'Vui lòng nhập ngày sinh');
        if (!error.dob) error.dob = Validate.isDate(user.dob);
    }

    if (user.phone !== undefined) {
        error.phone = Validate.isRequired(user.phone, 'Vui lòng nhập số điện thoại');
        if (!error.phone) error.phone = Validate.isPhone(user.phone);
    }

    if (user.email !== undefined) {
        error.email = Validate.isRequired(user.email, 'Vui lòng nhập email');
        if (!error.email) error.email = Validate.isEmail(user.email);
    }

    if (user.address !== undefined) {
        error.address = Validate.isRequired(user.address, 'Vui lòng chọn địa chỉ');
    }

    return error;
}

Validate.isRequired = (value, message) => {
    return value.trim() !== '' ? null : (message || 'Vui lòng nhập trường này');
}

Validate.isEmail = (value, message) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? null : (message || 'Vui lòng nhập đúng email');
}

Validate.isDate = (value, message) => {
    const regex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(value) ? null : (message || 'Vui lòng nhập đúng định dạng ngày');
}

Validate.isPhone = (value, message) => {
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return regex.test(value) ? null : (message || 'Vui lòng nhập đúng số điện thoại');
}