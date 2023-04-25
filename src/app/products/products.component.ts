import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public category: any;
  public categories: any[] = []; 
  private categorySubscribe: any;
  private productsSubscribe: any;
  // private productSubscribe: any;
  public products: any[] = [];
  // public product: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
    ) {}

  ngOnInit() {
    this.getAllCategories();
    this.getRouteParams();
  }

  ngOnDestroy() {
    this.categorySubscribe.unsubscribe();
    this.productsSubscribe.unsubscribe();
    // this.productSubscribe.unsubscribe();
  }

  getRouteParams() {
    this.route.queryParams.subscribe((params: any) => {
     if (params.category) {
      this.categorySubscribe = this.databaseService
      .getCategory(params.category)
      .subscribe((category: any) => {
        this.category = category;
        this.getProducts()
      });
    } else {
      this.getProducts();
      }
    })
  }

  getProducts() {
    this.productsSubscribe = this.databaseService.getProducts().subscribe((products: any) => {
      this.category?.id ? this.findCategory(products) : this.products = products;
      this.findCategory(products);
    })
  }

  // getProduct() {
  //   this.productsSubscribe = this.databaseService.getProducts().subscribe((product: any) => {
  //     this.category?.id ? this.findProduct(product) : this.product = product;
  //     this.findProduct(product);
  //   })
  // }

  // findProduct(product: any[]) {
  //   this.product = product.reduce((acc, item) => {
  //     if (this.product === this.products) {
  //       acc.push(item);
  //     }
  //     return acc;
  //   }, [])
  // }

  findCategory(products: any[]) {
    this.products = products.reduce((acc, item) => {
      if (item.category === this.category.id) {
        acc.push(item);
      }
      return acc;
    }, [])
  }

  getAllCategories() {
    this.categorySubscribe = this.databaseService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    })
  }

}
