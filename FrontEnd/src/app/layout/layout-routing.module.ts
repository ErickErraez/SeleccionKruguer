import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
  { path: 'admin', component: AdminComponent },
  { path: 'employee', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
