import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import * as bootstrap from 'bootstrap';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any = [];
  user: User = new User();
  vaccines: any = [];
  modal: any;
  fechaInicio: any = new Date().toISOString().split('T')[0];
  fechaFin: any = new Date().toISOString().split('T')[0];
  estadoVacuna: any;
  tipoVacuna: any;
  faDelete = faTrash;
  faUpdate = faPencil;
  myModal = document.getElementById('exampleModal');
  private validateEmail: any =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  userForm: FormGroup;
  constructor(private userServices: UserService) {
    this.getUsers();
    this.getVaccines();
    this.userForm = this.createFormGroup();
    var myModalEl = document.querySelector('#exampleModal');
    if (myModalEl) {
      this.modal = bootstrap.Modal.getOrCreateInstance(myModalEl); //
    }
  }

  createFormGroup() {
    return new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^([0-9]{10})*$/),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z a-z]*$/),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z a-z]*$/),
      ]),
      emailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validateEmail),
      ]),
    });
  }

  ngOnInit(): void {}

  async getUsers() {
    return await this.userServices.getUsers().subscribe((result: any) => {
      this.users = result;
    });
  }

  async getVaccines() {
    return await this.userServices.getVaccine().subscribe((result: any) => {
      this.vaccines = result;
    });
  }

  actualizar(user: any) {
    this.user = user;
  }

  create() {
    this.user.password = this.user.cedula;
    this.user.roleId = 2;
    this.user.id = Math.round((Math.random() * 100) / 2);
    this.userServices.createUser(this.user).subscribe(
      (result: any) => {
        alert(
          `Tu usuaio es: ${this.user.email} y tu clave es: ${this.user.password}`
        );
        this.getUsers();
        $('#exampleModal').modal('hide');
        $('.modal-backdrop').remove();
        this.user = new User();
        this.userForm.reset();
      },
      (error: any) => {
        if (error.error == 'Email already exists') {
          alert('El email ya existe');
        }
      }
    );
  }

  update() {
    this.userServices.updateUser(this.user).subscribe(
      (result: any) => {
        this.getUsers();
        $('#exampleModal').modal('hide');
        $('.modal-backdrop').remove();
        this.user = new User();
        this.userForm.reset();
      },
      (error: any) => {
        if (error.error == 'Email already exists') {
          alert('El email ya existe');
        }
      }
    );
  }

  eliminar(id: number) {
    this.userServices.deleteUser(id).subscribe(
      (result: any) => {
        this.getUsers();
      },
      (error: any) => {
        alert('No se pudo eliminar el registro');
      }
    );
  }

  async buscar() {
    let filtros = ``;
    if (this.estadoVacuna) {
      filtros += `&estado_vacunacion=${this.estadoVacuna}`;
    }
    if (this.tipoVacuna) {
      filtros += `&tipo_vacuna=${this.tipoVacuna}`;
    }
    this.fechaInicio = this.formato(this.fechaInicio);
    this.fechaFin = this.formato(this.fechaFin);
    await this.userServices.getUsersByFilter(filtros).subscribe(
      (result: any) => {
        result = result.filter(
          (n: any) =>
            n.fecha_vacuna > this.fechaInicio && n.fecha_vacuna < this.fechaFin
        );
        this.users = result;
        $('#filtros').modal('hide');
        $('.modal-backdrop').remove();
        this.fechaInicio = new Date().toISOString().split('T')[0];
        this.fechaFin = new Date().toISOString().split('T')[0];
      },
      (error: any) => {
        alert('No se pudo eliminar el registro');
      }
    );
  }

  formato(texto: string) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }
  close() {
    this.user = new User();
    this.userForm.reset();
  }

  get emailForm() {
    return this.userForm.get('emailForm');
  }

  get cedula() {
    return this.userForm.get('cedula');
  }
  get nombres() {
    return this.userForm.get('nombres');
  }
  get apellidos() {
    return this.userForm.get('apellidos');
  }
}
