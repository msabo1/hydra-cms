import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { QueryPostsDto } from './dto/query-posts.dto';
import { QueryResponse } from '../models/query-response.model';
import { Post } from './models/post.model';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GetPostDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url: string = 'api/posts';

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
  ) { }

  get(query: QueryPostsDto): Observable<QueryResponse<Post>>{
    const params: HttpParams = new HttpParams({fromObject: query as {[param: string]: string}});
    return this.http.get<Post[]>(this.url, {params, observe: 'response'})
      .pipe(
        catchError(error => this.messagesService.handleHttpError(error)),
        map((response: HttpResponse<Post[]>): QueryResponse<Post> => ({data: response.body, total: Number(response.headers.get('Pagination-Count'))}))
      );
  }

  getById(id: string, getPostDto?: GetPostDto): Observable<Post>{
    const params: HttpParams = new HttpParams({fromObject: getPostDto as {[param: string]: string}})
    return this.http.get<Post>(`${this.url}/${id}`, {params}).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  create(createPostDto: CreatePostDto): Observable<Post>{
    return this.http.post<Post>(this.url, createPostDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  update(id: string, updatePostDto: UpdatePostDto): Observable<Post>{
    return this.http.patch<Post>(`${this.url}/${id}`, updatePostDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }
}
