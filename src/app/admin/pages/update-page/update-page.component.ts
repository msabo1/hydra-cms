import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MdEditorComponent } from '../../../core/md-editor/md-editor.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesService } from '../../../core/pages/pages.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from '../../../core/pages/page.model';
import { UpdatePageDto } from '../../../core/pages/dto/update-page.dto';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MdEditorComponent) editor: MdEditorComponent;

  updatePageForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
  });

  page: Page;
  id: string;

  constructor(
    private readonly pagesService: PagesService,
    private readonly messagesService: MessagesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(){
    this.pagesService.getById(this.id).subscribe((page: Page) => {
      this.page = page;
      this.updatePageForm.controls.title.setValue(page.title);
      this.editor.markdownText.setValue(page.content);
    });
  }

  updatePage(status: string){
    const updatePageDto: UpdatePageDto = {
      title: this.updatePageForm.controls.title.value,
      content: this.editor.markdownText.value,
      status
    }
    this.pagesService.update(this.id, updatePageDto).subscribe((page: Page) => {
      if(page){
        this.messagesService.successMessage.next(`Page edited successfully!`);
        this.router.navigate(['pages'], {relativeTo: this.route.parent});
      }
    })
  }

}
