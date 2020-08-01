import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../../core/users/user.model';

@Directive({
  selector: '[appPrivilege]'
})
export class PrivilegeAuthDirective {

  @Input()

  private hasView = false;

  constructor(
    private readonly authService: AuthService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef
  ) { }

  @Input() set appPrivilege(privilege: string){
    const [permission, group] = privilege.split(' ');
    this.authService.loggedUser.subscribe((user: User) => {
      const hasPrivilege: boolean = user.role.hasPrivilege(permission, group);
      if(hasPrivilege && !this.hasView){
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }else if(!hasPrivilege && this.hasView){
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

}
