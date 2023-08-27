import { LanguageService } from '@app/core/services/language/language.service';
import { EventStatusFilter } from '@interfaces/event/filter/event-status-filter';

export const getStatusFilterLabels = (
  languageService: LanguageService,
): EventStatusFilter[] => {
  return [
    {
      name: languageService.instant('organization.events.statusFilter.all'),
      status: 'ALL',
    },
    {
      name: languageService.instant(
        'organization.events.statusFilter.futureAndActive',
      ),
      status: 'NotHistorical',
    },
    {
      name: languageService.instant(
        'organization.events.statusFilter.historical',
      ),
      status: 'Historical',
    },
  ];
};
