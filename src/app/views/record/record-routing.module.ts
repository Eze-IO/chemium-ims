import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordComponent } from './record.component';

const routes: Routes = [
  {
    path: '',
    component: RecordComponent,
    data: {
      title: 'List of Records 🗄️'
    }
  },
  { path: 'table/:table', component: RecordComponent, data: { title:'Record(s) 🗄️'}},
  { path: 'link/:link', component: RecordComponent, data: { title: 'Linked Record(s) 🗄️' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule {}
