import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/User';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  user: User = new User();
  loginForm: FormGroup;
  private validateEmail: any =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      emailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validateEmail),
      ]),
      passwordForm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  doLogin() {
    if (this.user.email !== '' && this.user.password !== '') {
      this.userService.login(this.user).subscribe({
        next: (res: any) => {
          if (res.accessToken) {
            let psw: any = this.user.password;
            localStorage.setItem('psw', psw);
            this.userService.setToken(res.accessToken);
            this.user = res.user;

            this.user.roles = this.userService
              .getRolById(res.user.roleId)
              .toPromise()
              .then((response: any) => {
                this.user.roles = response;
                localStorage.setItem('user', JSON.stringify(this.user));
                if (response.id == 1 && response.nombre == 'administrator') {
                  this.router.navigate(['web/admin']);
                } else {
                  this.router.navigate(['web/employee']);
                }
              })
              .catch((e: any) => console.error(e));
          } else {
            alert('Nose pudo iniciar sesion');
          }
        },
        error: (e) => {
          alert('Nose pudo iniciar sesion');
        },
      });
    } else {
      alert('No debe haber campos vacios');
    }
  }

  get emailForm() {
    return this.loginForm.get('emailForm');
  }

  get passwordForm() {
    return this.loginForm.get('passwordForm');
  }
}
