import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  private validateEmail: any =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  userForm: FormGroup;
  user: User = new User();
  faUpdate = faPencil;
  vaccines: any = [];
  showData: any;

  constructor(private userService: UserService) {
    this.userForm = this.createFormGroup();
    this.hideData();
    this.userService
      .getUserById(JSON.parse(this.userService.getUser()).id)
      .subscribe((result: any) => {
        this.user = result;
      });

    this.getVaccines();
  }

  ngOnInit(): void {}

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
      birthday: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      estadovacuna: new FormControl('', [Validators.required]),
      tipovacuna: new FormControl('', [Validators.required]),
      fechavacuna: new FormControl('', [Validators.required]),
      dosis: new FormControl('', [Validators.required]),
    });
  }

  actualizar(user: any) {
    this.user = user;
  }

  hideData() {
    console.log(this.user.estado_vacunacion);
    if (this.user.estado_vacunacion == 'No Vacunado') {
      this.user.tipo_vacuna = 'No aplica';
      this.user.fecha_vacuna = 'No Aplica';
      this.user.dosis = 'No aplica';
      this.showData = false;
      return;
    }
    this.user.tipo_vacuna = '';
    this.user.fecha_vacuna = '';
    this.user.dosis = '';
    this.showData = true;
    return;
  }

  async getVaccines() {
    return await this.userService.getVaccine().subscribe((result: any) => {
      this.vaccines = result;
    });
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
  get birthday() {
    return this.userForm.get('birthday');
  }
  get direccion() {
    return this.userForm.get('direccion');
  }
  get telefono() {
    return this.userForm.get('telefono');
  }
  get estadovacuna() {
    return this.userForm.get('estadovacuna');
  }
  get tipovacuna() {
    return this.userForm.get('tipovacuna');
  }
  get fechavacuna() {
    return this.userForm.get('fechavacuna');
  }
  get dosis() {
    return this.userForm.get('dosis');
  }

  close() {
    this.user = new User();
    this.userForm.reset();
  }

  update() {
    let psw: any = localStorage.getItem('psw');
    this.user.password = psw;
    this.userService.updateUser(this.user).subscribe(
      (result: any) => {
        $('#exampleModal').modal('hide');
        $('.modal-backdrop').remove();
        this.user = new User();
        this.userForm.reset();
        this.user = result;
      },
      (error: any) => {
        if (error.error == 'Email already exists') {
          alert('El email ya existe');
        }
      }
    );
  }
}
