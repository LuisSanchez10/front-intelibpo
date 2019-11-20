import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { FormCallsComponent } from './components/form-calls/form-calls.component'

const routes: Routes = [
  {
    path: '',
    component: GraphicsComponent
  },
  {
    path: 'add-call',
    component: FormCallsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
