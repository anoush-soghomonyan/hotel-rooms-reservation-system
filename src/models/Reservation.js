import Model from "./Model";

export default class Reservation extends Model{
    constructor(data) {
        super(data.id);
        this.update(data);
    }

    update(data) {
        this.creator_id = data.creator_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.room_number = data.room_number;
        this.interval = data.interval;
        this.adult = data.adult;
        this.children = data.children;
    }

    /**
     * this function can be used when in model will be unnecessary properties for server
     */
    toJson() {

    }
}