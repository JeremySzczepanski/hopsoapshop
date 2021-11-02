import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  prodSub: Subscription;
  prefUrlImage = `${environment.prefUrlImage}`
  products: Products[] = [];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data)=>{
        this.products = data; //on récupére les données et on les met dans "products"
      }
    )
  }

  ngOnDestroy(): void {
    this.prodSub.unsubscribe();
  }

  addToCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product: Products): void{
    this.cartService.deleteFromCart(product)
  }


}
