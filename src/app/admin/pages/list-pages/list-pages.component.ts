import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../../core/pages/pages.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { GetPagesParam, QueryPagesDto } from '../../../core/pages/dto/query-pages.dto';
import { QueryResponse } from '../../../core/models/query-response.model';
import { Page } from '../../../core/pages/page.model';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.css']
})
export class ListPagesComponent implements OnInit {

  pages: Page[];
  total: number;

  pageSize: number = 10;
  pageIndex: number = 0;

  searchTermSubject: Subject<string> = new Subject<string>();
  statusSubject: Subject<string> = new Subject<string>();
  status: FormControl = new FormControl('all');
  search: FormControl = new FormControl();

  tableColumns: string[] = ['title', 'status', 'author', 'createdAt', 'updatedAt', 'actions'];


  constructor(
    private readonly pagesService: PagesService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.getPages({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  getPages(query: GetPagesParam){
    const _query: QueryPagesDto = new QueryPagesDto(query);
    _query.cascade = 'true';
    this.pagesService.get(_query).subscribe((pagesResponse: QueryResponse<Page>) => {
      this.pages = pagesResponse.data;
      this.total = pagesResponse.total;
    });
  }

}
