
export class Clock{

    constructor(hour, minute){

        if(hour < 24 && hour >= 0)
        this.hour_ = hour;
        else{
            console.log("Error: hour value must be >= 0 and < 24");
        }

        if(minute < 60 && minute >= 0)
        this.minute_ = minute;
        else{
            console.log("Error: minute value must be >= 0 and < 60");
        }
        this.alarmIsActive = true;
    }
    setAlarm(alHour, alMinute){ 
        this.alHour = alHour
        this.alMinute = alMinute

    }
    set setAlarmFromString(string){
        this.alHour = string.split(":")[0]
        this.alMinute = string.split(":")[1]
    }
    get setAlarmFromString(){
        return this.alarmTime;
    }
    deactivateAlarm(){
        this.alarmIsActive = false
    }
    activateAlarm(){
        this.alarmIsActive = true
    }
    get time(){
        return {"hour": this.hour_.toString().padStart(2, '0'),
        "minute": this.minute_.toString().padStart(2, '0')
        }
    }
    get alarmTime(){
        return this.alHour.toString().padStart(2, '0') + ':' + this.alMinute.toString().padStart(2, '0')
    }

    tick(){
        this.minute_ += 1;
        if(this.minute_ == 60){
            this.minute_ = this.minute_ - 60;
            this.hour_ = this.hour_ + 1;
        }
        if(this.hour_ == 24){
            this.hour_ = this.hour_ - 24;
            this.day = this.day +1;
        }
        let hourNoll = (this.hour_ < 10 ) ? "0" + this.hour_ : this.hour_;
        let minuteNoll = (this.minute_ < 10 ) ? "0" + this.minute_ : this.minute_;

        console.log(hourNoll + ":" + minuteNoll);
        this.timeNow = (hourNoll + ":" + minuteNoll);
        return (hourNoll + ":" + minuteNoll)
        //Alarm
        if(this.alarmIsActive && this.hour_ == this.alHour && this.minute_ == this.alMinute && this.alarmIsActive){
            console.log("Alarm!!!");
        }

    }
}
