import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Products;
  prefUrlImage = `${environment.prefUrlImage}`;
  productSub: Subscription;

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private prodService: ProductsService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = +this.route.snapshot.params["id"];

    this.productSub = this.prodService.prodSubject.subscribe(
      (data: Products[])=>{
        this.product = this.prodService.getProductById(id);
      }
    );
    this.prodService.emitProducts();
  }

  addCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

}
