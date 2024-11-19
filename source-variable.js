function SourceVariable() {
    const { source } = this
    return {
        inited: false,
        map: new Map(),
        get: function(key) {
            this.init();
            return this.map.get(key)
        },
        set: function(key, value) {
            this.init();
            this.map.set(key, value);
            this.save()
        },
        add: function(value) {
            if (!value) return;
            this.init();
            Object.entries(value).forEach(entry => {
                let key = entry[0], value = entry[1];
                if (value instanceof Array) {
                    let array = this.map.get(key) || new Array();
                    let set = new Set(array.concat(value));
                    this.map.set(key, Array.from(set));
                } else {
                   this.map.set(key, value);
                }
            });
            this.save();
        },
        init: function() {
            if (this.inited) return;
            this.inited = true;
            let string = source.getVariable();
            if (!!string) {
                try {
                    this.map = new Map(Object.entries(JSON.parse(string)))
                } catch {}
            }
        },
        save: function() {
            source.setVariable(JSON.stringify(Object.fromEntries(this.map)))
        }
    }
}
