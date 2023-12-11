import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './login.service';


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {

    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
                (response: any) => {
                    if (response) {
                        console.log('Login success', response);

                        const specificValue = response.role;
                        const specificId = response.id
                        console.log('Value of yourKey:', specificValue);
                        localStorage.setItem('emp_id', specificId);
                        localStorage.setItem("role", specificValue);
                        const usernameValue = this.loginForm.get('username')?.value;
                        const passwordValue = this.loginForm.get('password')?.value;
                        console.log('Username:', usernameValue);
                        console.log('Password:', passwordValue);

                        if (specificValue == 'ROLE_MANAGER') {
                            this.router.navigate(['/manager-dashboard']);
                        }
                        else if (specificValue == 'ROLE_HR') {
                            this.router.navigate(['/hr-dashboard']);
                        }
                    }
                },
                (error) => {
                    console.error('Login failed', error);
                    // Handle the error appropriately, e.g., show an error message to the user
                }
            );

        }
    }
}
