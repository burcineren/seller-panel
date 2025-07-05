import { Injectable } from '@angular/core';
import { RequestHandlerService } from '../../core/services/request-handler.service';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService extends RequestHandlerService {
  getProducts(): Observable<Product[]> {
    return this.get<Product[]>({ url: 'products' });
  }


}