export default class CallDetails {
  
    constructor(item) {
      this.callingParty = item.callingParty;
      this.calledParty = item.calledParty;
      this.callType = item.callType;
      this.dateTime = item.dateTime;
    }
  }
