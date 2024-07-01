import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './views/product-page/product-page.component';
import { ProductCreateComponent } from './views/product-create/product-create.component';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductUpdateComponent } from './views/product-update/product-update.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductPageComponent },
  { path: 'add', component: ProductCreateComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'update/:productId', component: ProductUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
