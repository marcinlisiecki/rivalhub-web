import { Injectable } from '@angular/core';
import { LanguageService } from '@app/core/services/language/language.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(
    private languageService: LanguageService,
    private messageService: MessageService,
  ) {}

  createErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      life: 1000 * 10,
      summary: this.languageService.instant('error.summary'),
      detail: this.languageService.instant(message),
    });
  }
}
