import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private productSubscribe: any;
  public product: any;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
    ) {}

  ngOnInit() {
    this.getRouteParams();
  }

  ngOnDestroy() {
    this.productSubscribe.unsubscribe();
  }

  getRouteParams() {
    this.route.queryParams.subscribe((params: any) => {
     if (params.id) {
      this.productSubscribe = this.databaseService
      .getProduct(params.id)
      .subscribe((product: any) => {
        this.product = product;
      });
    } 
    })
  }
  

}
