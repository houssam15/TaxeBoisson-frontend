import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { TauxTaxeTrimestrielleService } from '../controller/service/taux-taxe-trimestrielle.service';
import { CategorieDeLocalService } from '../controller/service/categorie-de-local.service';
import { CategotieDeLocal } from '../controller/model/categotie-de-local';
import { TauxTaxeTrimestrielle } from '../controller/model/taux-taxe-trimestrielle';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  categories !: Array<CategotieDeLocal>;
  actionBtn : string = "Save";
  readOnly : boolean = false;
  tauxTaxeForm!: FormGroup; 
  constructor(private formBuilder : FormBuilder
    ,private tauxTaxeService : TauxTaxeTrimestrielleService
    ,private categorieLocalService: CategorieDeLocalService
    ,private dialogRef:MatDialogRef<DialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public editData: any
    ){}
    ngOnInit(): void {
        this.tauxTaxeForm=this.formBuilder.group({
          ref : ['',Validators.required],
          categorieDeLocal : ['',Validators.required],
          dateAppMin : ['',Validators.required],
          dateAppMax : ['',Validators.required],
          pourcentage : ['',Validators.required],
          pourcentageRetardPremierMois : ['',Validators.required],
          pourcentageRetardAutreMois:   ['',Validators.required]
        });
        this.findAll();
        if(this.editData){
          this.actionBtn = "Update";

          this.tauxTaxeForm.controls['ref'].setValue(this.editData.ref);
          this.tauxTaxeForm.controls['categorieDeLocal'].setValue(this.editData.categorieDeLocal.code);
          this.tauxTaxeForm.controls['dateAppMin'].setValue(this.editData.dateAppMin);
          this.tauxTaxeForm.controls['dateAppMax'].setValue(this.editData.dateAppMax);
          this.tauxTaxeForm.controls['pourcentage'].setValue(this.editData.pourcentage);
          this.tauxTaxeForm.controls['pourcentageRetardPremierMois'].setValue(this.editData.pourcentageRetardPremierMois);
          this.tauxTaxeForm.controls['pourcentageRetardAutreMois'].setValue(this.editData.pourcentageRetardAutreMois);
          //ref non modifiable 
          this.readOnly=true;
        }
    }
    tauxTaxeFormToTrimestrielle(){
      this.tauxTaxeTrimestrielle.ref = this.tauxTaxeForm.value.ref;
      this.categorieDeLocal.code = this.tauxTaxeForm.value.categorieDeLocal;
      this.tauxTaxeTrimestrielle.dateAppMin = this.tauxTaxeForm.value.dateAppMin;
      this.tauxTaxeTrimestrielle.dateAppMax = this.tauxTaxeForm.value.dateAppMax;
      this.tauxTaxeTrimestrielle.pourcentage = this.tauxTaxeForm.value.pourcentage;
      this.tauxTaxeTrimestrielle.pourcentageRetardPremierMois = this.tauxTaxeForm.value.pourcentageRetardPremierMois;
      this.tauxTaxeTrimestrielle.pourcentageRetardAutreMois = this.tauxTaxeForm.value.pourcentageRetardAutreMois;
    }
    public saveTaux(){
      this.tauxTaxeFormToTrimestrielle();
      if(!this.editData){
        this.tauxTaxeService.save().subscribe(data => {
        if(data<0){
          if(data==-1){alert("taux taxe trimestrielle already exist!!")}
          if(data==-2 || data == -3){alert("categorie de local not found !!")}
          if(data==-4){alert("pourcentage is null or négative @_@ ")}
        }else if(data>0){
          alert("save succes ");
          this.tauxTaxeForm.reset();
          this.dialogRef.close('save');
        }
      })}else{

        this.updateTaux();
      }
      
    }

    updateTaux(){
      this.tauxTaxeFormToTrimestrielle();

        this.tauxTaxeService.editTaux(this.tauxTaxeTrimestrielle).subscribe(data =>{
          if(data<0){
            if(data==-1){alert("taux not found ")}
            if(data==-2){alert("categorie not found ")}


          }else if(data>0){
            alert("update succes !!")
            this.tauxTaxeForm.reset();
            this.dialogRef.close('update');

          }
        })
    }
    public findAll(){
      this.categorieLocalService.findAll().subscribe(data =>{
          this.categories=data;
      })
    }
    get tauxTaxeTrimestrielle(): TauxTaxeTrimestrielle {
      return this.tauxTaxeService.tauxTaxeTrimestrielle;
    }
  
    set tauxTaxeTrimestrielle(value: TauxTaxeTrimestrielle) {
      this.tauxTaxeService.tauxTaxeTrimestrielle = value;
    }
    get tauxTaxeTrimestrielles(): Array<TauxTaxeTrimestrielle> {
  
      return this.tauxTaxeService.tauxTaxeTrimestrielles;
    }
    set tauxTaxeTrimestrielles(value: Array<TauxTaxeTrimestrielle>) {
      this.tauxTaxeService.tauxTaxeTrimestrielles= value;
    }
  
    get categorieDeLocal(): CategotieDeLocal {
      return this.tauxTaxeService.categorieDeLocal;
    }
  
}




