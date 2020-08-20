import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PagesService } from '../../../core/pages/pages.service';
import { GetPagesParam, QueryPagesDto } from '../../../core/pages/dto/query-pages.dto';
import { QueryResponse } from '../../../core/models/query-response.model';
import { Page } from '../../../core/pages/page.model';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../../core/users/user.model';
import { UsersService } from '../../../core/users/users.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeletePageComponent } from '../delete-page/delete-page.component';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.css']
})
export class ListPagesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pages: Page[];
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
    private readonly pagesService: PagesService,
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
        const query: GetPagesParam = {
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

  getPages(query: GetPagesParam){
    const _query: QueryPagesDto = new QueryPagesDto(query);
    _query.loadAuthor = 'true';
    this.pagesService.get(_query).subscribe((pagesResponse: QueryResponse<Page>) => {
      this.pages = pagesResponse.data;
      this.total = pagesResponse.total;
    });
  }

  openDeleteDialog(id: string){
    const dialogRef: MatDialogRef<DeletePageComponent> = this.dialog.open(DeletePageComponent, {data: id});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }

}
