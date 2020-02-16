import Model from "./Model";

export default class User extends Model {
    constructor(data) {
        super(data.id);
        this.username = data.username;
    }

    test() {
        return "huhu";
    }
}