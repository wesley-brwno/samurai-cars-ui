import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin!: FormGroup;
  formRegister!: FormGroup;
  toggleForm: boolean = true;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const action = params['auth'];
      if (action === 'register') {
        this.toggleForm = false;       
      }
    })

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmitLogin() {    
    this.authService.executeAuthentication(this.formLogin.value).subscribe({
      next: () => {
        this.router.navigate(['dashboard']);
      },
      error: (error) => {        
        this.formLogin.setErrors({ authError: error.title });
      }
    })
  }

  onSubmitSignUp() {
    this.authService.registerUser(this.formRegister.value).subscribe({
      next: () => {
        console.log("Registed"); 
      },
      error: (error) => {
        this.formRegister.setErrors({ registerError: error.title })
      }
    })
  }
}
