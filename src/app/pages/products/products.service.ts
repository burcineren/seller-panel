import { Injectable } from '@angular/core';
import { RequestHandlerService } from '../../core/services/request-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends RequestHandlerService {

  constructor() {
    super();
  }
  getProducts() {
    return this.get({ url: 'products' });
  }
}
