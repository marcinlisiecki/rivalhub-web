import { Component } from '@angular/core';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent {
  // get organization ID somehow when we will have organization site ready
  stationType: string | undefined
  stationName: string | undefined
  errorName: string | undefined
  errorType: string | undefined
  errorMsg = "Pole nie moze byc puste"


  onNameFocusOut(field: string) {
    if (field == undefined || !field.length) {
       this.errorName = this.errorMsg
    } else {
      this.errorName = undefined
    }
    return
  }

  onTypeFocusOut(field: string) {
    if (field == undefined || !field.length) {
      this.errorType = this.errorMsg
    } else {
      this.errorType = undefined
    }
    return
  }
  onSendClick(stationName: string, stationType: string) {
    // to be refactored
    if (stationName == undefined || !stationType.length) {
      this.errorName = this.errorMsg
    } else {
      this.errorName = undefined
    }
    if (stationType == undefined || !stationType.length) {
      this.errorType = this.errorMsg
    } else {
      this.errorType = undefined
    }
    return

    // handle sending to backend
  }
}
