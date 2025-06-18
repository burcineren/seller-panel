export interface User {
    id: number;
    username: string;
    role: 'salesman' | 'manager' | 'customer';
}