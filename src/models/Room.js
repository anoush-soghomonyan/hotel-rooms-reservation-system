import Model from "./Model";

export default class Room extends Model {
    constructor(data) {
        super(data.id);
        this.update(data);
        this.tmp_dates = null;
    }

    update(data) {
        this.type = data.type;
        this.unavailable_dates = data.unavailable_dates;
    }
}