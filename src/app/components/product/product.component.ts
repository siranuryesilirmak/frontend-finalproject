import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';


import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[]=[];
  dataLoader = false;
   filterText="";
   constructor(private productService:ProductService, 
    private activatedRoute:ActivatedRoute,
     private toastrServise:ToastrService,
     private cartService:CartService) { }

  ngOnInit(): void {  
   
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
    
  }

  getProducts(){
    this.productService.getProducts().subscribe(response =>{
      this.products = response.data;
      this.dataLoader=true;
    } )
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response =>{
      this.products = response.data;
      this.dataLoader=true;
    } )
  }
  
  addToCart(product:Product){
    
    if(product.productId===1){
      this.toastrServise.error("Bu ürün sepete eklenemez.","Hata")

    }else{
      this.toastrServise.success("Sepete eklendi.",product.productName)
      this.cartService.addToCart(product);
    }
    
  }

}
