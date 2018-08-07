import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuardsModule } from './guards/guards.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }, { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule' 
  }, { 
    path: 'signup', 
    loadChildren: './pages/signup/signup.module#SignupPageModule' 
  }, { 
    path: 'forgot-password', 
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' 
  }, {
    path: 'app',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    GuardsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
