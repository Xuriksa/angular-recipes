import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  form: FormGroup;

  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('tester', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;        
        this.router.navigate(['/recipes']);
      },
      error: this.handleError,
    })
  }  

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alert = this.viewContainerRef.createComponent<AlertComponent>(AlertComponent);
    alert.instance.message = message;
    this.closeSub = alert.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.viewContainerRef.clear();
      //alert.destroy();
    });
  }

  private handleError = (errorMessage: string) => {
    console.log(errorMessage);
    this.error = errorMessage;
    //this.showErrorAlert(errorMessage); // dynamic component
    this.isLoading = false;
  };
}
