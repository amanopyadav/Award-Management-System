import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddAsset } from './addasset.service';
import { response } from 'express';
// import { DisplayAssetService } from '../dashboard/display-asset.service';

@Component({
  selector: 'add-asset-cmp',
  moduleId: module.id,
  templateUrl: 'addasset.component.html'
})

export class AddAssetComponent implements OnInit {
  assetForm: FormGroup;
  vendorName: string; // To store the fetched vendor name
  procurementDate: Date; // To store the fetched procurement date

  constructor(private fb: FormBuilder,private addAssetService: AddAsset) {
    this.assetForm = this.fb.group({
      asset_category: ['', Validators.required],
      manufacturer: ['', Validators.required],
      product: ['', Validators.required],
      model: ['', Validators.required],
      serial_number: ['', Validators.required],
      end_of_support: ['', Validators.required],
      end_of_extended_support: ['', Validators.required],
      processor: ['', Validators.required],
      ram: ['',Validators.required],
      hdd_ssd: ['', Validators.required],
      licence_type: ['', Validators.required],
      os: ['', Validators.required],
      procurement_id: ['', Validators.required],
      procurementDate: [{ value: '', disabled: true }],
      vendorName: [{ value: '', disabled: true }],
      state: ['', Validators.required],
      subState1: ['', Validators.required],
      subState2: ['', Validators.required],
      with_antivirus_yn: ['N', Validators.required],
      with_msoffice_yn: ['N', Validators.required],
      with_charger_yn: ['N', Validators.required],
      with_laptop_bag_yn: ['N', Validators.required],
    });
  }

  


  ngOnInit() {
    this.assetForm.get('state').valueChanges.subscribe((state) => {
      if (state === 'instock') {
        this.assetForm.get('subState1').setValue('available');
        this.assetForm.get('substate2').setValue('working');
      } else {
        this.assetForm.get('subState1').setValue('');
        this.assetForm.get('subState2').setValue('');
      }
    });

    this.assetForm.get('procurement_id').valueChanges.subscribe((procurementId)=>{
      if(procurementId){
        // calling a method to fetch procurement details based on ID
        this.fetchProcurementDetails(procurementId);
      }else{
        this.resetProcurementDetails();
      }
    });

  }


    // Method to fetch procurement details based on ID
    fetchProcurementDetails(procurementId: number) {
      // Call your service to fetch details from the backend
      this.addAssetService.getProcurementDetails(procurementId).subscribe(
        (response: any) => {
          // Update the form controls with the fetched values
          this.vendorName = response.vendorName;
          this.procurementDate = response.procurementDate;
  
          this.assetForm.get('vendorName').setValue(this.vendorName);
          this.assetForm.get('procurementDate').setValue(this.procurementDate);
        },
        (error) => {
          // Handle errors
          console.error('Failed to fetch procurement details:', error);
          window.alert("Error!, failed to fetch procurement details")
          // You may want to reset the values or show an error message here
        }
      );
    }




    // Method to reset procurement details
    resetProcurementDetails() {
      this.vendorName = '';
      this.procurementDate = null;

      this.assetForm.get('vendorName').setValue('');
      this.assetForm.get('procurementDate').setValue('');
    }


    onProcurementIdChange() {
      const procurementId = this.assetForm.get('procurement_id').value;
      if (procurementId) {
          // calling a method to fetch procurement details based on ID
          this.fetchProcurementDetails(procurementId);
      } else {
          this.resetProcurementDetails();
      }
    }



  onSubmit() {
    // console.log(this.assetForm.value);
  
    // Set values based on checkbox conditions
    const formValue = this.assetForm.value;
    formValue.with_antivirus_yn = formValue.with_antivirus_yn ? 'Y' : 'N';
    formValue.with_msoffice_yn = formValue.with_msoffice_yn ? 'Y' : 'N';
    formValue.with_charger_yn = formValue.with_charger_yn ? 'Y' : 'N';
    formValue.with_laptop_bag_yn = formValue.with_laptop_bag_yn ? 'Y' : 'N';
  
    // Now you can use the formValue object for further processing or submission
    console.log("Form values: ",formValue);

    console.log("Vendor Name: ", this.assetForm.get('vendorName').value);
    console.log("Procurement Date: ", this.assetForm.get('procurementDate').value);

    this.addAssetService.addAssetRecord(formValue).subscribe(
      (response: string) => {
          console.log(response);
                  
          if(response){
              console.log("Asset added in inventory");
              this.assetForm.reset();
              this.assetForm.get('asset_category').setValue('');
              this.assetForm.get('state').setValue('');
              this.assetForm.get('subState1').setValue('');
              this.assetForm.get('subState2').setValue('');

              window.alert("Asset added in inventory")
          }else {
              console.log('failed to add asset');
              this.assetForm.reset();
              this.assetForm.get('asset_category').setValue('');
              this.assetForm.get('state').setValue('');
              this.assetForm.get('subState1').setValue('');
              this.assetForm.get('subState2').setValue('');
              window.alert("failed to add asset")
          }
      },
      (error) => {
        // Handle HTTP error
        console.error('HTTP error:', error);
        // Handle failed signup
        console.error('Failed to add asset');
        this.assetForm.reset();
        this.assetForm.get('asset_category').setValue('');
        this.assetForm.get('state').setValue('');
        this.assetForm.get('subState1').setValue('');
        this.assetForm.get('subState2').setValue('');
        window.alert("failed to add asset")
      }
    )


 
  }
  


}
