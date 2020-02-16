import Model from "./Model";

export default class Room extends Model {
    constructor(data) {
        super(data.id);
        this.type = data.type;
        this.unavailable_dates = data.unavailable_dates;
    }
}