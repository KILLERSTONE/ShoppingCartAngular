import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: '', component: RetrieveComponent },
  { path: 'delete/:id', component: DeleteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
