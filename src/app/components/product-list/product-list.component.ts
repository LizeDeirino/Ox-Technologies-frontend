import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;


  constructor(private productService: ProductService, 
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
    this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // new search for products with keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {
      // check if "id" parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if (hasCategoryId) {
        // get the "id" param string. convert string to number using + symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }
      else {
        // no category id available then the category id = 1
        this.currentCategoryId = 1;
      }

      // check if the category id changed
      // note: Angular will reuse the component if it is currently being viewed
      // so if the category changed: reset the page number back to 1
      if (this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }
      this.previousCategoryId = this.currentCategoryId;

      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
  
      // get products for given category id
      this.productService.getProductListPaginate(this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId)
        .subscribe(
          data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
          }
        );

  }

}
