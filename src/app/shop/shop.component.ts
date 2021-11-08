import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  prodSub: Subscription;
  products = [];

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data)=>{
        this.products = this.prodService.getProductByPage(0);
      }
    );
    this.prodService.emitProducts();
  }

}
