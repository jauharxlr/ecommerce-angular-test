import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';
import { UtilService } from '../../service/util.service';
import { AddProductRequest } from '../../model/add-product-req.model';
import { ProductRes } from '../../model/product-res.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  request: AddProductRequest = new AddProductRequest();

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductRes,
    private util: UtilService,
    private dialogRef: MatDialogRef<AddProductComponent>, private api: ApiService) { }
  ngOnInit(): void {
    if (this.data) {
      this.request.name = this.data.name;
      this.request.description = this.data.description;
      this.request.price = this.data.price;
    }
  }

  onAddProduct() {
    if (!this.util.validateString(this.request.name)) {
      this.util.toastErr("Name should not be empty!");
    } else if (!this.util.validateString(this.request.description)) {
      this.util.toastErr("Description should not be empty!");
    } else if (!this.util.validatePositiveNumber(this.request.price)) {
      this.util.toastErr("Provide a valid price!");
    } else {
      if (this.data) {
        this.api.editProduct(this.data.id, this.request).subscribe(res => {
          this.util.toastInfo("Product updated.");
          this.dialogRef.close(true)
        });
      } else {
        this.api.addProduct(this.request).subscribe(res => {
          this.util.toastInfo("Product added.");
          this.dialogRef.close(true)
        });
      }
    }
  }

}
