import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { Subscription } from 'rxjs';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { LanguageService } from '@app/core/services/language/language.service';
interface Type {
  label: string;
  type: string;
}
@Component({
  selector: 'app-ranking-categories',
  templateUrl: './ranking-categories.component.html',
  styleUrls: ['./ranking-categories.component.scss'],
})
export class RankingCategoriesComponent implements OnInit, OnDestroy {
  @Output() categoryChange = new EventEmitter();
  selectedCategory!: Type;
  categoriesSub!: Subscription;
  categories: Type[] = [];
  types: any[] = [];

  constructor(
    private eventsService: EventsService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }

  getCategories() {
    this.categoriesSub = this.eventsService
      .getAllEventTypesInApp()
      .subscribe((events) => {
        this.selectedCategory = this.createType(events[0]);
        events.forEach((ev) => {
          this.types.push(ev);
          this.categories.push(this.createType(ev));
        });
      });
  }

  cliked() {
    this.categoryChange.emit(this.selectedCategory);
  }

  createType(event: EventType): Type {
    return {
      type: event,
      label: this.languageService.instant(categoryTypeToLabel(event)),
    };
  }
}
