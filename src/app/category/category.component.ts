import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../model/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  productSub: Subscription;
  products: Products[];

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request)=>{
          console.log(request.id);
          this.productSub = this.productsService.prodSubject.subscribe(
            (data: Products[])=>{
              const prod = data.filter(product => {
                return product.Category == request.id
              });
              //console.log(prod);
              this.products = prod;
            }
          );
          this.productsService.emitProducts();
      }
    )
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
