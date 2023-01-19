export default {
    user: {
        title: 'Manager user',
        permissions: [
            {
                path: 'api/users',
                method: 'GET',
                name: 'List user'
            },
            {
                path: 'api/users',
                method: 'POST',
                name: 'Create User'
            },
            {
                path: 'api/users/:id',
                method: 'GET',
                name: 'User Detail'
            },
            {
                path: 'api/users/:id',
                method: 'PUT',
                name: 'Update User'
            },
            {
                path: 'api/users/:id',
                method: 'DELETE',
                name: 'Delete User'
            }
        ]
    },
    auth: {
        title: 'Manager auth',
        permissions: [
            {
                path: 'api/auth/add-role',
                method: 'POST',
                name: 'Create Role'
            },
            {
                path: 'api/auth/roles',
                method: 'GET',
                name: 'List Role'
            }
        ]
    }
}