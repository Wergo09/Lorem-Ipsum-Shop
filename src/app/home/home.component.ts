import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public messageSubmit: string = '';
  public messageStatus: boolean = false;

  contactForm: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  public visibility: boolean = false;

  onSubmit(): void {
    if (
      !this.contactForm.name ||
      !this.contactForm.email ||
      !this.contactForm.phone
    ) {
      this.messageSubmit = 'Поля формы заполнены некорректно!';
      this.visibility = true;
      this.messageStatus = false;
    } else {
      this.messageStatus = true;
      this.visibility = true;
      this.messageSubmit = 'Ваше сообщение успешно отправлено!';
      Object.keys(this.contactForm).forEach(
        (key) => (this.contactForm[key] = '')
      );
    }
  }
}
