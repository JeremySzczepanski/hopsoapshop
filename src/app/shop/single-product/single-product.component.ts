import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private prodService: ProductsService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];
    this.product = this.prodService.getProductById(id)
  }

  addCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

}
