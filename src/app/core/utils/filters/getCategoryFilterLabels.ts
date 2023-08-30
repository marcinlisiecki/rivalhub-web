import { categoryTypeToLabel } from '@app/core/utils/event';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventType } from '@interfaces/event/event-type';
import { EventCategoryFilter } from '@interfaces/event/filter/event-category-filter';

export const getCategoryFilterLabels = (
  languageService: LanguageService,
  eventTypes: EventType[],
): EventCategoryFilter[] => {
  let eventTypesFilter: EventCategoryFilter[] = [];

  eventTypesFilter = [
    {
      name: languageService.instant(
        'organization.dashboard.events.categoriesFilter.all',
      ),
      value: 'ALL',
    },
  ];
  eventTypesFilter = eventTypesFilter.concat(
    eventTypes.map((type) => ({
      name: languageService.instant(categoryTypeToLabel(type)),
      value: type,
    })),
  );

  return eventTypesFilter;
};
