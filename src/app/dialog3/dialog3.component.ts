import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NotificationLocalService } from '../controller/service/notification-local.service';
import { NotificationLocal } from '../controller/model/notification-local';
import { Redevable } from '../controller/model/redevable';
import { Local } from '../controller/model/local';
@Component({
  selector: 'app-dialog3',
  templateUrl: './dialog3.component.html',
  styleUrls: ['./dialog3.component.scss'],
})
export class Dialog3Component {
  actionBtn : string = "Save";
  readOnly : boolean = false;
  notificationLocalForm!: FormGroup; 
  constructor(private formBuilder : FormBuilder
    ,private notificationService : NotificationLocalService
    ,private dialogRef:MatDialogRef<DialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public editData: any
    ){}
    ngOnInit(): void {

        this.notificationLocalForm=this.formBuilder.group({
          ref : ['',Validators.required],
          redevable : ['',Validators.required],
          local : ['',Validators.required],
          dateActuelle:   ['',Validators.required]
        });
        
    }
    FormToNotificationLocal(){
      this.notificationLocal.ref = this.notificationLocalForm.value.ref;
      this.redevable.cin = this.notificationLocalForm.value.redevable;
      this.local.reference = this.notificationLocalForm.value.local;
      this.notificationLocal.dateActuelle=this.notificationLocalForm.value.dateActuelle;
    }
    public saveNotification(){

      this.FormToNotificationLocal();
      
        this.notificationService.save().subscribe(data => {
        if(data<0){
          if(data==-1){alert("-1 : Notification Local already exist!!")}
          if(data==-2 ){alert("-2 : Redevable not found !!")}
          if(data==-3){alert("-3 : Local not found  ")}
          if(data==-4){alert("-4 : Date Actuelle not valid  ")}
          if(data==-5){alert("-5 : pas de notification")}
          if(data==-6){alert("-6 : trimestre is null ")}
          if(data==-7){alert("-7 : notification problem !!!! /n entity.getAnnée()>anneeactuel")}



        }else if(data>0){
          alert("save succes ");
          this.notificationLocalForm.reset();
          this.dialogRef.close('save');
        }
      })
      
    }

   
   
    get notificationLocal(): NotificationLocal {
      return this.notificationService.notificationLocal;
    }
  
    set notificationLocal(value: NotificationLocal) {
      this.notificationService.notificationLocal = value;
    }

    get notificationLocals(): Array<NotificationLocal> {
      return this.notificationService.notificationLocals;
    }

    set notificationLocals(value: Array<NotificationLocal>) {
      this.notificationService.notificationLocals= value;
    }
  
   get redevable():Redevable{
    return this.notificationService.redevable;
   }
   get local():Local{
    return this.notificationService.local;
   }
   
  
}
