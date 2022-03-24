export default function Validate(user) {
    let error = {};

    if (user.name === '') {
        error.name = 'Vui lòng nhập tên';
    }

    return error;
}