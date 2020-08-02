import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UsersService } from '../../../core/users/users.service';
import { Observable, Subject, merge, BehaviorSubject } from 'rxjs';
import { User} from '../../../core/users/user.model';
import { QueryUsersDto, GetUsersParam} from '../../../core/users/dto/query-users.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { QueryResponse } from '../../../core/models/query-response.model';
import { RolesService } from '../../../core/roles/roles.service';
import { Role } from '../../../core/roles/role.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  reloadSubject: Subject<boolean>;

  users: User[];
  total: number;
  roles: Role[];

  pageSize: number = 10;
  pageIndex: number = 0;

  tableColumns: string[] = ['username', 'status', 'role', 'createdAt', 'updatedAt', 'actions'];

  searchTermSubject: Subject<string> = new Subject<string>();
  statusSubject: Subject<string> = new Subject<string>();
  roleSubject: Subject<string> = new Subject<string>();
  status: FormControl = new FormControl('all');
  search: FormControl = new FormControl();
  role: FormControl = new FormControl('all');

  constructor(
    private readonly usersService: UsersService,
    private readonly dialog: MatDialog,
    private readonly rolesService: RolesService,
    private readonly authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getUsers({pageIndex: this.pageIndex, pageSize: this.pageSize});
    if(this.authService.hasPrivilege('read', 'roles')){
      this.rolesService.get().subscribe((rolesResponse: QueryResponse<Role>) => {
        this.roles = rolesResponse.data;
      });
    }
    
  }

  ngAfterViewInit(): void{
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(
      this.paginator.page,
      this.sort.sortChange,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.statusSubject,
      this.roleSubject,
      this.reloadSubject
      )
      .subscribe(() => {
        const query: GetUsersParam = {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortBy: this.sort.active,
          order: this.sort.direction,
          search: this.search.value,
          status: this.status.value == 'all' ? null : this.status.value,
          roleId: this.role.value == 'all' ? null : this.role.value
          }
        this.getUsers(query);
    });

  }

  getUsers(query: GetUsersParam){
    const _query: QueryUsersDto = new QueryUsersDto(query);
    _query.cascade = 'true';
    this.usersService.get(_query).subscribe((usersResponse: QueryResponse<User>) => {
      this.users = usersResponse.data;
      this.total = usersResponse.total;
    });
  }

  openEditDialog(user: User){
    const dialogRef: MatDialogRef<UpdateUserComponent> = this.dialog.open(UpdateUserComponent, {data: {user, roles: this.roles}});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }

  openDeleteDialog(id: string){
    const dialogRef: MatDialogRef<DeleteUserComponent> = this.dialog.open(DeleteUserComponent, {data: id});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }
}
