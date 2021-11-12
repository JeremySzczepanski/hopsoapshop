import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/model/users';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage;

  constructor(private userService: UsersService,
              private fb: FormBuilder,
              private router: Router,
              private cartService: CartService,
              ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void{
    this.loginForm = this.fb.group({
      email: this.fb.control('',Validators.email),
      password: this.fb.control('',Validators.minLength(6))
    })
  }

  onSubmit(): void{
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const newUser: Users = {email: email, password: password};

    this.userService.authentifier(newUser).then(
      (data)=>{
        const cart = this.cartService.cart;
        if(cart.length){
          this.router.navigate(['/checkout']);
        }else{
          this.router.navigate(['/shop']);
        }
      }
    ).catch((error)=>{
      this.errorMessage = error;
      setTimeout(()=>{
        this.errorMessage = null;
      },3000);
      console.log(error);
    })

    //console.log({email: email, password: password});
  }

}
