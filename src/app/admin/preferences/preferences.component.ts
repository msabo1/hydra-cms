import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RolesService } from '../../core/roles/roles.service';
import { PreferencesService } from '../../core/preferences/preferences.service';
import { Role } from '../../core/roles/role.model';
import { QueryResponse } from '../../core/models/query-response.model';
import { FormControl } from '@angular/forms';
import { Preferences } from '../../core/preferences/preferences.model';
import { User } from '../../core/users/user.model';
import { UpdatePreferencesDto } from '../../core/preferences//dto/update-preferences.dto';
import { MessagesService } from '../../core/messages/messages.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  enableEdit: boolean = false;
  roles: Role[];

  defaultRole: FormControl = new FormControl();
  visitorRole: FormControl = new FormControl();

  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
    private readonly preferencesService: PreferencesService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.authService.loggedUser.subscribe((user: User) => {
      if(user.role.hasPrivilege('read', 'roles')){
        this.rolesService.get().subscribe((rolesResponse: QueryResponse<Role>) => this.roles = rolesResponse.data);
      }
    });
    this.preferencesService.get().subscribe((preferences: Preferences) => {
      this.defaultRole.setValue(preferences.defaultRoleId);
      this.visitorRole.setValue(preferences.visitorRoleId);
    });
  }

  onSave(){
    const updatePreferencesDto: UpdatePreferencesDto = {
      defaultRoleId: this.defaultRole.value,
      visitorRoleId: this.visitorRole.value
    };
    this.preferencesService.update(updatePreferencesDto).subscribe((preferences: Preferences) => {
      if(preferences.defaultRoleId == this.defaultRole.value && preferences.visitorRoleId == this.visitorRole.value){
        this.messagesService.successMessage.next('Preferences updated sucessfully!');
        this.enableEdit = false;
        this.preferencesService.loadNewPreferences()
      }else{
        this.messagesService.errorMessage.next('Something went wrong!');
      }
    });
  }

}
