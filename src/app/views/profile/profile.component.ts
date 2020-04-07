import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user } from '../../models/user';
import { ExtensionService } from '../../helpers/extension.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mainForm : FormGroup;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  _success: boolean = false;
  get success(): boolean {
    return this._success;
  }
  selectedFile: File;

  private u:user = new user();
  private picture_content:SafeHtml;
  constructor(private cu: CurrentUserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cu.GetInfo().then(x => {
      this.u = x;
    })
    this.toggleLoadingProfile();
    this.mainForm = this.formBuilder.group({
       first_name: ['', Validators.required],
       last_name: ['', Validators.required],
       email: ['', Validators.required],
       phone_number: ['', Validators.required]
     });
     this.mainForm.patchValue({
       first_name: this.u.name,
       last_name: this.u.name,
       email: this.u.email,
       phone_number: this.u.phone_number
     });
  }

  async toggleLoadingProfile(){
    let loader = "<div class='d-flex justify-content-center animated fadeIn' style='margin:auto;'>"
    +"<div class='spinner-border m-5' style='width: 12rem; height: 12rem;' role='status'>"
    +"<span class='sr-only'>Loading...</span></div></div>";
    let picture = "<img src='[IMAGE]' class='bd-placeholder-img card-img' alt='[EMAIL]' />";
    await this.cu.GetInfo().then(x => {
      picture = picture.replace("[IMAGE]", x.picture).replace('[EMAIL]', x.email);
    })
    if(this.picture_content===picture){
      this.picture_content = loader;
    } else {
      this.picture_content = picture;
    }
  }

  onTextChange(e) {
    if(!ExtensionService.IsEmptyOrNull(this.mainForm.controls.email.value))
      this.u.email = this.mainForm.controls.email.value;
    if(!ExtensionService.IsEmptyOrNull(this.mainForm.controls.phone_number.value))
      this.u.phone_number = this.mainForm.controls.phone_number.value;
    let name = (this.mainForm.controls.first_name.value+" "+this.mainForm.controls.last_name.value);
    if(!ExtensionService.IsEmptyOrNull(name))
      this.u.name = name;
  }

  onFileSelected(e) {
    this.selectedFile = <File>e.target.files[0];
    console.log(this.selectedFile);
  }

  async convertToDataUri(): Promise<string> {
    let result = null
    var reader = new FileReader();
    let promise = new Promise<string>(function(resolve, reject) {
      reader.onloadend = () => resolve(reader.result.toString());
      reader.onerror = reject;
      if (this.selectedFile!==null || typeof(this.selectedFile)!==undefined)
      reader.readAsDataURL(this.selectedFile);
    });
    if (this.selectedFile !== null)
      result = await promise;
    return result;
  }

  onUpload() {
    this.toggleLoadingProfile();
    this.convertToDataUri().then(x => {
      if (this.selectedFile !== null) {
        if (this.cu.UploadPicture(x)) {
          this._success = true;
          this._status = "Successfully updated profile picture";
        } else {
          this._success = false;
          this._status = "Failed to update profile picture";
        }
      }
      this.toggleLoadingProfile();
    });
  }

  onSubmit() {
    this.cu.UpdateInfo(this.u).then(x => {
      if(x){
        this._success = true;
        this._status = "Successfully updated information";
      } else {
        this._success = false;
        this._status = "Falied to update information";
      }
    });
  }
}
