import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../model/auth-res.model';
import { HOOK, Reflector } from '../../service/reflector';
import { UtilService } from '../../service/util.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../../dialog/add-product/add-product.component';
import { ApiService } from '../../service/api.service';
import { ProductRes } from '../../model/product-res.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  loggedInUsername: string = '';
  loggedInUserRole: string = '';
  products: ProductRes[] = [];
  searchKey: string = '';

  constructor(private profileReflect: Reflector<UserDetails>,
    private jwtReflect: Reflector<string>,
    public util: UtilService,
    public dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loggedInUsername = this.profileReflect.get(HOOK.USER_DETAILS).fullname;
    this.loggedInUserRole = this.profileReflect.get(HOOK.USER_DETAILS).userRole;
    this.getAllProducts();
  }

  onLogout(): void {
    this.profileReflect.clear(HOOK.USER_DETAILS);
    this.jwtReflect.clear(HOOK.JWT);
    this.util.logout();
  }

  onAddProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent,
      {
        width: '90%',
        maxWidth: '400px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.getAllProducts();
      }
    });
  }

  getAllProducts(): void {
    this.api.getAllProducts().subscribe(res => this.products = res);
  }

  onEditProduct(item: ProductRes) {
    const dialogRef = this.dialog.open(AddProductComponent,
      {
        width: '90%',
        maxWidth: '400px',
        data: item
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.getAllProducts();
      }
    });
  }

  onDelete(id: number) {
    this.api.deleteProduct(id).subscribe(res => {
      this.util.toastInfo('Product deleted');
      this.getAllProducts();
    })
  }

  onSearch(): void {
    this.api.search(this.searchKey).subscribe(res => this.products = res);
  }
}
