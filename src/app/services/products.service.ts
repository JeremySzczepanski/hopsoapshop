import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Result } from '../model/result';
import { environment } from './../../environments/environment';
import { Products } from '../model/products';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products[] = [];
  prodSubject = new Subject<Products[]>()

  numberOfProductByPage = 6;

  constructor(private http: HttpClient) {
    //lorsque l'on lance le service, on met à jour les données car products est par défaut un tableau vide
    this.getProductsFromServer();
   }


  //Role: mettre dans l'observable this.products, on appelera cette méthode à chaque fois qu'il y aura des modifications sur le tableau products
  emitProducts(){
    this.prodSubject.next(this.products);
  }


  //role: récuperer les données de products depuis l'api
  getProductsFromServer(){
    const url = `${environment.API+'products?'+environment.API_KEY}`;

    this.http.get(url).subscribe(
      (dataProducts: Result)=>{
        if(dataProducts.status == 200) {
            this.products = dataProducts.result;
            this.emitProducts();
        }else{
            console.log("Error : "+dataProducts.message);
        }
      }
    )
  }

  getProductById(id: number): Products{
    const product = this.products.find(element => element.idProduct == id);
    if(product){
      return product;
    }
    return null;
  }

  getProductByPage(pageNumber: number): Products[]{
    const maxPageNumber = this.products.length/this.numberOfProductByPage;
    if(pageNumber >0 || pageNumber< maxPageNumber){
        const prodResult = this.products.slice(pageNumber*this.numberOfProductByPage, (pageNumber+1)*this.numberOfProductByPage)
        return prodResult;
    }
    return null;

  }

}
