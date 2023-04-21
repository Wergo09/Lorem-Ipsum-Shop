import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public category?: any;
  public categories: any[] = []; 
  private categorySubscribe: any;
  private productsSubscribe: any;
  public products: any[] = [];

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

  findCategory(products: any[]) {
    this.products = products.reduce((acc, item) => {
      if (item.category === this.category?.id) {
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
