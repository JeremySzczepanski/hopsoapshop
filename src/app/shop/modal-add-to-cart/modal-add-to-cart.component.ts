import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/model/products';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.css']
})
export class ModalAddToCartComponent implements OnInit {

	@Input() products: Products[];
	prefUrlImage = `${environment.prefUrlImage}`;

  constructor() { }

  ngOnInit(): void {
  }

}
