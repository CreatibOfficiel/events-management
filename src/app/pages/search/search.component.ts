import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from "@angular/router";
import { Event } from '../../models/event.model';
import {FormsModule} from "@angular/forms";
import {CardComponent} from "../../shared/components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {EventService} from "../../core/event.service";
import {Company} from "../../models/company.model";
import {CardCompanyComponent} from "../../shared/components/card-company/card-company.component";
import {CompanyService} from "../../core/company.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    NgForOf,
    NgIf,
    CardCompanyComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchValue: string = '';
  events: Event[] = [];
  companies: Company[] = [];
  placeHolderSearch: string = 'Search...';

  constructor(
    private router: Router,
    private eventService: EventService,
    private companyService: CompanyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }


  search() {
    if (this.searchValue === '' || this.searchValue === null || this.searchValue === undefined) {
      this.events = [];
      this.companies = [];
    } else {
      this.eventService.search(this.searchValue).then((events: Event[]) => {
        this.events = events;
      });
      this.companyService.search(this.searchValue).then((companies: Company[]) => {
        this.companies = companies;
      });
    }
    this.cdr.detectChanges();
  }
}
