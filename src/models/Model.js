import uuidv1 from 'uuid/v1';

export default class Model {
    constructor(id) {
        this.id = id || uuidv1();
    }
}