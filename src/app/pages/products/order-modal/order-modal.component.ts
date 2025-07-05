import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Product } from '../../../core/models/product.model';
import { Order } from '../../../core/models/order.model';
import { OrderStatus } from '../../../core/enums/order-status.enum';
import { UserHandlerService } from '../../../core/services/user-handler.service';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  providers: []
})
export class OrderModalComponent {
  @Input() visible = false;
  @Input() product: Product | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() orderCreated = new EventEmitter<Order>();

  userForm: FormGroup;
  submitting = signal(false);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
    });

    effect(() => {
      if (this.visible) {
        console.log('Modal açıldı, form durumu:', this.userForm.status);
      }
    });
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSubmit(): void {
    if (this.userForm.invalid || !this.product) {
      this.userForm.markAllAsTouched();
      console.error('Form geçersiz veya ürün eksik!');
      return;
    }

    this.submitting.set(true);


    const formValue = this.userForm.value;

    const newOrder: Order = {
      id: Date.now(),
      productId: this.product.id,
      productName: this.product.name,
      status: OrderStatus.PENDING,
      customerName: `${formValue.firstName} ${formValue.lastName}`,
      orderDate: new Date().toISOString(),
      totalAmount: this.product.price,
      address: formValue.address,
      productStock: this.product.stock,
      selectedStoreId: this.product.storeId,
    };

    this.orderCreated.emit(newOrder);

    this.messageService.add({
      severity: 'success',
      summary: 'Onaylandı',
      detail: 'Sipariş onaya gönderildi!'
    });

    this.onHide();
    this.userForm.reset();
    this.submitting.set(false);
  }

  onCancel(): void {
    this.onHide();
    this.userForm.reset();
  }
}