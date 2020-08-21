import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Post } from '../../../core/posts/models/post.model';
import { PostsService } from '../../../core/posts/posts.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdEditorComponent } from '../../../core/md-editor/md-editor.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Tag } from '../../../core/posts/models/tag.model';
import { UpdatePostDto } from '../../../core/posts/dto/update-post.dto';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit, AfterViewInit {
  @ViewChild(MdEditorComponent) editor: MdEditorComponent;
  @ViewChild('t') t: any;

  updatePostForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    publishOn: new FormControl()
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  post: Post;
  id: string;

  constructor(
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(){
    this.postsService.getById(this.id).subscribe((post: Post) => {
      this.post = post;
      this.updatePostForm.controls.title.setValue(post.title);
      if(new Date(post.publishOn) > new Date()){
      this.updatePostForm.controls.publishOn.setValue(post.publishOn);
      }
      this.editor.markdownText.setValue(post.content);
      this.tags = post.tags;

    });
  }

  createPost(status: string){
    const {title, publishOn} = this.updatePostForm.controls;
    const updatePostDto: UpdatePostDto = {
      title: title.value,
      content: this.editor.markdownText.value,
      status,
      tags: this.tags,
      publishOn: publishOn.value
    }
    this.postsService.update(this.id, updatePostDto).subscribe((post: Post) => {
      if(post.id){
        this.messagesService.successMessage.next(`Post ${status} successfully!`);
        this.router.navigate(['posts'], {relativeTo: this.route.parent});
      }
    })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag): void {
    this.tags = this.tags.filter((t: Tag) => t.name !== tag.name);
  }

  getDate(): Date{
    return new Date();
  }

}
