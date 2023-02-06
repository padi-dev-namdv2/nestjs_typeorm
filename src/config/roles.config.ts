export default {
    user: {
        title: 'Manager user',
        permissions: [
            {
                path: 'api/users/create',
                method: 'GET',
                name: 'List user'
            },
            {
                path: 'api/users/list',
                method: 'POST',
                name: 'Create User'
            },
            {
                path: 'api/users/by-id/:id',
                method: 'GET',
                name: 'User Detail'
            },
            {
                path: 'api/users/update/:id',
                method: 'PUT',
                name: 'Update User'
            },
            {
                path: 'api/users/delete/:id',
                method: 'DELETE',
                name: 'Delete User'
            },
            {
                path: 'api/users/send-mail-test',
                method: 'GET',
                name: 'Send mail test'
            },
            {
                path: 'api/users/export-user',
                method: 'GET',
                name: 'Export User'
            },
            {
                path: 'api/users/import-user',
                method: 'POST',
                name: 'Import User'
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