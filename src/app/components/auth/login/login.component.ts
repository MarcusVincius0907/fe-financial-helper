import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    //KEEPING THIS SIMPLE FOR NOW

    valCheck: string[] = ['remember'];

    email!: string;
    password!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    onLogin(){
        if(!!this.email && !!this.password){
            this.authService.login({email: this.email, password: this.password}).subscribe(res => {
                const token = res?.data?.access_token;

                if(token){
                    this.authService.setIsAuthenticated(token);
                    this.router.navigate(['/'])
                }
            })
        }
    }


}
