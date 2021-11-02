import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { Products } from '../model/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
  }




}
