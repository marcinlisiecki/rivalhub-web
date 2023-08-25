export interface PullUpsSeriesScores {
  seriesID: number;
  scores: {
    userName: string;
    score: number;
    seriesID: number;
  }[];
}
