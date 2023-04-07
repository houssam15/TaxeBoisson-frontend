import { Component, Inject, OnInit } from '@angular/core';
import { CategotieDeLocal } from '../controller/model/categotie-de-local';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TauxTaxeTrimestrielle } from '../controller/model/taux-taxe-trimestrielle';
import { CategorieDeLocalService } from '../controller/service/categorie-de-local.service';
import { TauxTaxeTrimestrielleService } from '../controller/service/taux-taxe-trimestrielle.service';
import { DialogComponent } from '../dialog/dialog.component';
import { TaxeTrimestrielleService } from '../controller/service/taxe-trimestrielle.service';
import { TaxeTrimestrielle } from '../controller/model/taxe-trimestrielle';
import { Redevable } from '../controller/model/redevable';
import { Local } from '../controller/model/local';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component implements OnInit{
  categories !: Array<CategotieDeLocal>;
  actionBtn : string = "Save";
  readOnly : boolean =false;
  taxeForm!: FormGroup; 
  constructor(private formBuilder : FormBuilder,private taxeService : TaxeTrimestrielleService,private categorieLocalService: CategorieDeLocalService,private dialogRef:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public editData: any){}
    ngOnInit(): void {
        this.taxeForm=this.formBuilder.group({
          reference : ['',Validators.required],
          redevable : ['',Validators.required],
          categorieDeLocal : ['',Validators.required],
        //  tauxTaxeTrimestrielle : ['',Validators.required],
          local : ['',Validators.required],
          chiffreAffaire : ['',Validators.required],
          dateActuel :   ['',Validators.required]
        })
        this.findAll();
        if(this.editData!=null){
          this.actionBtn="Update";
          this.taxeForm.controls['reference'].setValue(this.editData.reference);
          this.taxeForm.controls['redevable'].setValue(this.editData.redevable.cin);
          this.taxeForm.controls['categorieDeLocal'].setValue(this.editData.categorieDeLocal.code);
          //this.taxeForm.controls['tauxTaxeTrimestrielle'].setValue(this.editData.tauxTaxeTrimestrielle.ref);
          this.taxeForm.controls['local'].setValue(this.editData.local.reference);
          this.taxeForm.controls['chiffreAffaire'].setValue(this.editData.chifrreAffaire);
          this.taxeForm.controls['dateActuel'].setValue(this.editData.dateActuel);
          this.readOnly=true;
        }
    }
    taxeFormTOTrimestrielle(){
      this.taxeTrimestrielle.reference=this.taxeForm.value.reference;
      this.redevable.cin=this.taxeForm.value.redevable;
      this.categorieDeLocal.code=this.taxeForm.value.categorieDeLocal;
      //this.tauxTaxeTrimestrielle.ref=this.taxeForm.value.tauxTaxeTrimestrielle;
      this.local.reference=this.taxeForm.value.local;
      this.taxeTrimestrielle.chifrreAffaire=this.taxeForm.value.chiffreAffaire;
      this.taxeTrimestrielle.dateActuel=this.taxeForm.value.dateActuel;

    }
    public saveTaxe(){
      this.taxeFormTOTrimestrielle();
      if(!this.editData){
        this.taxeService.save().subscribe(data => {
          if(data<0){
            if(data==-1){alert(data +": Taxe déja exist !!  ")}
            if(data==-2){alert(data+": Redevable not found !! ")}
            if(data==-3){alert(data+": Local not found ")}
            if(data==-4){alert(data+": invalid chiffre D'affaire")}
            if(data==-5){alert(data+": Categorie de local  not found ")}
           // if(data==-6){alert("taux not found ")}
            if(data==-7){alert(data+": comeback in the end of  trimestre !!")}
            if(data==-8){alert(data+":  no taux applicable for this local  ")}
          }else if(data>0){
            alert(data+": save succes ");
            this.taxeForm.reset();
            this.dialogRef.close('save');
  
          }
        })
      }else{
        this.updateTaxe();

      }
      
    }
    updateTaxe(){
      this.taxeFormTOTrimestrielle();
      this.taxeService.editTaxe(this.taxeTrimestrielle).subscribe(
        data => {
          if(data<0){
            if(data==0){alert("local or taux  not found !!")}
            if(data==-1){alert("Taxe déja exist !!  ")}
            if(data==-2){alert("Redevable not found !! ")}
            if(data==-3){alert("Local not found ")}
            if(data==-4){alert("invalid chiffre D'affaire")}
            if(data==-5){alert("Categorie de local  not found ")}
          //  if(data==-6){alert("taux not found ")}
            if(data==-7){alert("comeback in the end of  trimestre !!")}
            if(data==-8){alert("  no taux applicable for this local  ")}
            if(data==-9){alert("wait intel the end of trimestre !! ")}
            if(data==-10){alert("local not found ")}
            if(data==-11){alert("taxe not found ")}

          
          }
          else if(data>0){
            alert("update success !!");
            this.taxeForm.reset();
            this.dialogRef.close('update');
          }
        }
      )
    }
    public findAll(){
      this.categorieLocalService.findAll().subscribe(data =>{
          this.categories=data;
      })
    }
    get taxeTrimestrielle(): TaxeTrimestrielle {
      return this.taxeService.taxeTrimestrielle;
    }
  
    set taxeTrimestrielle(value: TaxeTrimestrielle) {
      this.taxeService.taxeTrimestrielle = value;
    }

    get taxeTrimestrielles(): Array<TaxeTrimestrielle> {
      return this.taxeService.taxeTrimestrielles;
    }
    set taxeTrimestrielles(value: Array<TaxeTrimestrielle>) {
      this.taxeService.taxeTrimestrielles= value;
    }
  
    get categorieDeLocal(): CategotieDeLocal {
      return this.taxeService.categorieDeLocal;
    }
    get redevable(): Redevable{
      return this.taxeService.redevable;
    }
    get tauxTaxeTrimestrielle(): TauxTaxeTrimestrielle{
      return this.taxeService.tauxTaxeTrimestrielle;
    }
    get local(): Local{
      return this.taxeService.local;
    }
  
}
