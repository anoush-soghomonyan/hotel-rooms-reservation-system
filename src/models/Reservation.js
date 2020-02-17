import Model from "./Model";
import DataManager from "../managers/DataManager";

export default class Reservation extends Model{
    constructor(data) {
        super(data.id);
        this.update(data);
    }

    update(data) {
        this.creator_id = data.creator_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at || [];
        this.room_number = data.room_number;
        this.end = this.getDateObj(data.end);
        this.start = this.getDateObj(data.start);
    }

    isCreatorMe() {
        return this.creator_id === DataManager.sharedInstance().user.id;
    }

    getDateObj(ts) {
        if(ts instanceof Date) {
            return ts;
        } else {
            return new Date(ts);
        }
    }
}