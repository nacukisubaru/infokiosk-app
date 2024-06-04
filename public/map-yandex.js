class MapYandexClass {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;

        this.render(); 
        console.log(this.options);
    }

    render = () => {
        // window.ymaps.ready(function() {
            var myMapShops = new window.ymaps.Map(this.selector, {
                center: this.centerMap,
                zoom: 10,
                controls: [],
            });
        // });
         
    }
}