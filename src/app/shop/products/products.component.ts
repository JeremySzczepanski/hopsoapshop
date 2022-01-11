import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
export class ProductsComponent implements OnInit {

  prodSub: Subscription;
  prefUrlImage = `${environment.prefUrlImage}`
  @Input() products: Products[] = [];
  @Input() isPaginate: boolean = true;
  currentPage= 0;
  pages = [0,1,2,3,4,5,6];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {

  }



  addToCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product: Products): void{
    this.cartService.deleteFromCart(product)
  }

  changePage(pageNumber: number): void{
    const prod = this.prodService.getProductByPage(pageNumber);
    if(prod.length){
      this.products = prod;
      this.currentPage = pageNumber;
    }
  }

  nextPage(): void{
    const newCurrentPage = this.currentPage +1;
    const prod = this.prodService.getProductByPage(newCurrentPage);
    if(prod.length){
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }

  prevPage(): void{
    const newCurrentPage = this.currentPage -1;
    const prod = this.prodService.getProductByPage(newCurrentPage);
    if(prod.length){
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }



}
