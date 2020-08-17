import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdEditorComponent } from './md-editor.component';
import { } from './material.module'
import { MaterialModule } from './material.module';
import * as marked from 'marked';
import { MarkedPipe } from './marked.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MdEditorComponent, MarkedPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [{provide: 'marked', useValue: marked}],
  exports: [MdEditorComponent]
})
export class MdEditorModule { }
