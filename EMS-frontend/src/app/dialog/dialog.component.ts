import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 productForm: FormGroup;
  freshnessList=['Brand New',"refurbished"];
  actionBtn:string='Save';

  constructor(private fb:FormBuilder,
    private apiService:ApiService,  
    @Inject (MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { 

  }

  ngOnInit(): void {
     this.productForm=this.fb.group({
        productName:['', Validators.required],
        category:['', Validators.required],
        freshness:['', Validators.required],
        price:['', Validators.required],  
        comment:['', Validators.required],
        date:['', Validators.required]
  });
  if(this.editData){
    this.actionBtn='Update'; 
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['comment'].setValue(this.editData.comment);
  this.productForm.controls['date'].setValue(this.editData.date);
  }
  } 
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        console.log(this.productForm.value);
  
        this.apiService.postData(this.productForm.value).subscribe(data => {
          console.log(data);
          alert('Product added successfully!!!');
      this.dialogRef.close('Save');
        }, err => {
          console.log(err);
        });
  
    }
    }
    else{
      this.updateProduct();
    }
  
  } 
  updateProduct(){
    console.log(this.editData);
    this.apiService.updateData(this.productForm.value,this.editData._id).subscribe(data=>{
      alert('Product updated successfully!!!');
      this.productForm.reset();
      this.dialogRef.close('update');
      
    })  
  }
}
