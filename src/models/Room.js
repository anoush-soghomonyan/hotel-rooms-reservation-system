import Model from "./Model";

export default class Room extends Model {
    constructor(data) {
        super(data.id);
        this.unavailable_dates = data.unavailable_dates;
    }
}