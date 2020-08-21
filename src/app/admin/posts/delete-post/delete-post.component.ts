import { Component, OnInit, Inject } from '@angular/core';
import { PostsService } from '../../../core/posts/posts.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeletePageComponent } from '../../pages/delete-page/delete-page.component';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  constructor(
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService,
    private readonly dialogRef: MatDialogRef<DeletePageComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onDelete(){
    this.postsService.delete(this.id).subscribe(() => {
      this.messagesService.successMessage.next('Post deleted successfully!');
      this.dialogRef.close(true);
    })
  }

}
