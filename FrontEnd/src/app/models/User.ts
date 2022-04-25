import { Rol } from './Rol';

export class User {

    id?: number;
    email?: string;
    password?: string;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    fecha_nacimiento?: string;
    direccion?: string;
    telefono?: string;
    estado_vacunacion?: string;
    tipo_vacuna?: string;
    fecha_vacuna?: string;
    dosis?: string;
    age?: string;
    roleId?: number;
    roles: Rol = new Rol();
}
