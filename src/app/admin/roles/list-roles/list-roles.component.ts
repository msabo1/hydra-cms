import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Role } from '../../../core/roles/role.model';
import { GetRolesParam, QueryRolesDto } from '../../../core/roles/dto/query-roles.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, merge, from } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RolesService } from '../../../core/roles/roles.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QueryResponse } from '../../../core/models/query-response.model';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';
import { PrivilegesComponent } from '../privileges/privileges.component';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  reloadSubject: Subject<boolean>;

  roles: Role[];
  total: number;

  pageSize: number = 10;
  pageIndex: number = 0;

  tableColumns: string[] = ['name', 'privileges', 'createdAt', 'updatedAt', 'actions'];

  searchTermSubject: Subject<string> = new Subject<string>();
  statusSubject: Subject<string> = new Subject<string>();
  search: FormControl = new FormControl();

  constructor(private readonly rolesService: RolesService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRoles({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  ngAfterViewInit(): void{
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(
      this.paginator.page,
      this.sort.sortChange,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.statusSubject,
      this.reloadSubject
      )
      .subscribe(() => {
        const query: GetRolesParam = {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortBy: this.sort.active,
          order: this.sort.direction,
          search: this.search.value,
          }
        this.getRoles(query);
    });

  }

  getRoles(query: GetRolesParam){
    const _query: QueryRolesDto = new QueryRolesDto(query);
    this.rolesService.get(_query).subscribe((rolesResponse: QueryResponse<Role>) => {
      this.roles = rolesResponse.data;
      this.total = rolesResponse.total;
    });
  }

  openEditDialog(role: Role){
    const dialogRef: MatDialogRef<UpdateRoleComponent> = this.dialog.open(UpdateRoleComponent, {data: role});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }

  openDeleteDialog(id: string){
    const dialogRef: MatDialogRef<DeleteRoleComponent> = this.dialog.open(DeleteRoleComponent, {data: id});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }

  openPrivilegesDialog(role: Role){
    const dialogRef: MatDialogRef<PrivilegesComponent> = this.dialog.open(PrivilegesComponent, {data: role});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }
}
