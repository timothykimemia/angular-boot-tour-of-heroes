import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crisis-message',
  templateUrl: './crisis-message.component.html',
  styleUrls: ['./crisis-message.component.css']
})
export class CrisisMessageComponent implements OnInit {
  details: string;
  message: string;
  sending = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  send(): void {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel(): void {
    this.closePopup();
  }

  closePopup(): void {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]).then();
  }

}
