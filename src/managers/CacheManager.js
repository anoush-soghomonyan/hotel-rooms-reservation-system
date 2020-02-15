export default class CacheManager {
    constructor(model) {
        this.models = new Map();
        this.model = model;
    }

    createModelFromJson(json) {
        if(!json) {
            return null;
        }
        let model = this.getModelById(json.id);
        if(model === undefined) {
            let instance = new this.model(json);
            this.setModelById(instance.id, instance);
            model = instance;
        } else if(model.update){
            model.update(json);
        }
        return model;
    }

    createModelsArray(array, reversed = false) {
        let data = [];
        for(let el of array) {
            let model = this.createModelFromJson(el);
            if(reversed) {
                data.unshift(model);
            } else {
                data.push(model);
            }
        }
        return data;
    }

    getModelById(id) {
        return this.models.get(id);
    }

    setModelById(id, value) {
        this.models.set(id, value);
    }

    removeModelById(id) {
        this.models.delete(id);
    }

    clear() {
        this.models.clear();
    }
}
