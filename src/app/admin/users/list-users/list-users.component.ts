import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Observable, Subject, merge, BehaviorSubject } from 'rxjs';
import { User, Users } from '../../../models/user.model';
import { QueryUsersDto, GetUsersParam} from '../../../models/query-users.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @Input()
  loggedUser: User;

  users: User[];
  total: number;

  pageSize: number = 10;
  pageIndex: number = 0;

  tableColumns: string[] = ['username', 'status', 'role', 'createdAt', 'updatedAt'];

  searchTermSubject: Subject<string> = new Subject<string>();
  statusSubject: Subject<string> = new Subject<string>();
  status: FormControl = new FormControl();
  search: FormControl = new FormControl();

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.status.setValue('all');
    this.getUsers({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  ngAfterViewInit(): void{
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange, this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()), this.statusSubject ).subscribe(() => {
      const query: GetUsersParam = {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        sortBy: this.sort.active,
        order: this.sort.direction,
        search: this.search.value,
        status: this.status.value == 'all' ? null : this.status.value
      }
      this.getUsers(query);
    });

  }

  getUsers(query: GetUsersParam){
    const _query: QueryUsersDto = new QueryUsersDto(query);
    _query.cascade = 'true';
    this.usersService.get(_query).subscribe((users: Users) => {
      this.users = users.users;
      this.total = users.total;
    });
  }
}
