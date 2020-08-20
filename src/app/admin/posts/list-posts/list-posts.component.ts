import { Component, OnInit, ViewChild } from '@angular/core';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../../core/users/user.model';
import { Post } from '../../../core/posts/models/post.model';
import { PostsService } from '../../../core/posts/posts.service';
import { QueryPostsDto, GetPostsParam } from '../../../core/posts/dto/query-posts.dto';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../../core/users/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QueryResponse } from '../../../core/models/query-response.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  posts: Post[];
  total: number;

  users: User[];
  searchUsersTerm: Subject<string> = new Subject<string>();
  authorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  pageSize: number = 10;
  pageIndex: number = 0;

  searchTermSubject: Subject<string> = new Subject<string>();
  statusSubject: Subject<string> = new Subject<string>();
  status: FormControl = new FormControl('all');
  search: FormControl = new FormControl();

  reloadSubject: Subject<boolean> = new Subject<boolean>();

  tableColumns: string[] = ['title', 'status', 'author', 'createdAt', 'updatedAt', 'actions'];


  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPages({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(
      this.paginator.page,
      this.sort.sortChange,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.statusSubject,
      this.authorSubject,
      this.reloadSubject
      )
      .subscribe(() => {
        const query: GetPostsParam = {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortBy: this.sort.active,
          order: this.sort.direction,
          search: this.search.value,
          status: this.status.value == 'all' ? null : this.status.value,
          authorId: this.authorSubject.value
          }
        this.getPages(query);
    });

    this.searchUsersTerm.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term: string) => {
      this.authorSubject.next(null);
      if(term.length > 0){
        this.usersService.get({search: term, limit: '5'}).subscribe((usersResponse: QueryResponse<User>) => {
          this.users = usersResponse.data;
        });
      }
    });
  }

  getPages(query: GetPostsParam){
    const _query: QueryPostsDto = new QueryPostsDto(query);
    _query.loadAuthor = true;
    this.postsService.get(_query).subscribe((pagesResponse: QueryResponse<Post>) => {
      this.posts = pagesResponse.data;
      this.total = pagesResponse.total;
    });
  }

  openDeleteDialog(id: string){
    const dialogRef: MatDialogRef<DeletePostComponent> = this.dialog.open(DeletePostComponent, {data: id});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }
}
