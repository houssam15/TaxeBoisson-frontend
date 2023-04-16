import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import { Routes, RouterModule } from '@angular/router';
import { TauxTaxeTreimestrielleComponent } from './view/taux-taxe-treimestrielle/taux-taxe-treimestrielle.component';
import { TaxeTrimestrielleComponent } from './view/taxe-trimestrielle/taxe-trimestrielle.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HomeComponent } from './view/home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationLocalComponent } from './view/notification-local/notification-local.component';
import { Dialog3Component } from './dialog3/dialog3.component';
import { Dialog4Component } from './dialog4/dialog4.component';
import { GeneralComponent } from './view/general/general.component';
import { Dialog5Component } from './dialog5/dialog5.component';

//modification


const routes: Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:GeneralComponent},
  {path:'tauxTaxeTrimestrielle',component:TauxTaxeTreimestrielleComponent},
  {path:'taxeTrimestrielle',component:TaxeTrimestrielleComponent},
  {path:'notificationLocal',component:NotificationLocalComponent}


]
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    Dialog2Component,
    TauxTaxeTreimestrielleComponent,
    TaxeTrimestrielleComponent,
    HomeComponent,
    NotificationLocalComponent,
    Dialog3Component,
    Dialog4Component,
    GeneralComponent,
    Dialog5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
