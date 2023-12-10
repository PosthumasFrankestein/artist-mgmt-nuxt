<!-- components/MyTable.vue -->
<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Users</h2>

        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
                // Add more user data as needed
            ],
        };
    },
};
</script>
  
<style scoped>
/* Additional styling to make the table look prettier */
.container {
    max-width: 800px;
    margin: 0 auto;
}

.table {
    font-size: 16px;
}

.table th,
.table td {
    text-align: center;
}

.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.table-light th,
.table-light td,
.table-light thead th {
    background-color: #f8f9fa;
}

.table-bordered {
    border: 1px solid #dee2e6;
}

.table th,
.table td {
    padding: 12px;
}
</style>
  