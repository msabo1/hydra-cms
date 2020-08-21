import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../core/posts/posts.service';
import { CreatePostDto } from '../../../core/posts/dto/create-post.dto';
import { MdEditorComponent } from '../../../core/md-editor/md-editor.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService } from '../../../core/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../../core/posts/models/post.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Tag } from '../../../core/posts/models/tag.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @ViewChild(MdEditorComponent) editor: MdEditorComponent;

  createPostForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    publishOn: new FormControl()
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  constructor(
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  createPost(status: string){
    const {title, publishOn} = this.createPostForm.controls;
    const createPageDto: CreatePostDto = {
      title: title.value,
      content: this.editor.markdownText.value,
      status,
      tags: this.tags,
      publishOn: publishOn.value
    }
    this.postsService.create(createPageDto).subscribe((post: Post) => {
      if(post.id){
        this.messagesService.successMessage.next(`Post ${status} successfully!`);
        this.router.navigate(['..'], {relativeTo: this.route});
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
