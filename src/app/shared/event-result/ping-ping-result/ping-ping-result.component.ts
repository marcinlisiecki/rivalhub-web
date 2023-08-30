import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventResult } from '@app/core/interfaces/event/event-result';
import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';
import * as moment from 'moment';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';

@Component({
  selector: 'app-ping-ping-result',
  templateUrl: './ping-ping-result.component.html',
  styleUrls: ['./ping-ping-result.component.scss'],
})
export class PingPingResultComponent implements OnInit {
  @Input({ required: true }) result!: PingPongResult;
  @Output() winnerCalcutated: EventEmitter<number> = new EventEmitter<number>();
  team1Result?: number;
  team2Result?: number;
  team1Won?: boolean;
  team2Won?: boolean;
  tie: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.calculateSets();
  }

  private calculateSets(): void {
    this.team1Result = 0;
    this.team2Result = 0;
    for (const set of this.result.sets ?? []) {
      if (set.team1Score > set.team2Score) {
        this.team1Result++;
      } else {
        this.team2Result++;
      }
    }
    this.calculateWinner();
  }

  //who won the match
  private calculateWinner(): void {
    if (this.team1Result! > this.team2Result!) {
      this.team1Won = true;
      this.team2Won = false;
      this.tie = false;
      this.winnerCalcutated.emit(-1);
    } else if (this.team1Result! < this.team2Result!) {
      this.team1Won = false;
      this.team2Won = true;
      this.tie = false;
      this.winnerCalcutated.emit(1);
    } else {
      this.team1Won = false;
      this.team2Won = false;
      this.tie = true;
      this.winnerCalcutated.emit(0);
    }
  }

  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
