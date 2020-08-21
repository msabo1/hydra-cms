import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MdEditorComponent } from '../../../core/md-editor/md-editor.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePageDto } from '../../../core/pages/dto/create-page.dto';
import { PagesService } from '../../../core/pages/pages.service';
import { Page } from '../../../core/pages/page.model';
import { MessagesService } from '../../../core/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit{
  @ViewChild(MdEditorComponent) editor: MdEditorComponent;

  createPageForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required])
  });

  constructor(
    private readonly pagesService: PagesService,
    private readonly messagesService: MessagesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  createPage(status: string){
    const createPageDto: CreatePageDto = {
      title: this.createPageForm.controls.title.value,
      content: this.editor.markdownText.value,
      status
    }
    this.pagesService.create(createPageDto).subscribe((page: Page) => {
      if(page.id){
        this.messagesService.successMessage.next(`Page ${status} successfully!`);
        this.router.navigate(['..'], {relativeTo: this.route});
      }
    })
  }
}
