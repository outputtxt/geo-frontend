import "./control.css";

var draggable = true;

L.Control.Draggable = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    var container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    var button = L.DomUtil.create(
      "a",
      "leaflet-control-button control-button",
      container,
    );

    L.DomEvent.disableClickPropagation(button);
    L.DomEvent.on(button, "click", function () {
      console.log("click");
      console.log(button.selected);
      console.log(button);
      console.log(button.classList);

      if (button.selected) {
        button.classList.remove("selected");
        button.selected = false;
      } else {
        button.classList.add("selected");
        button.selected = true;
      }

      draggable = !draggable;

      if (draggable) {
        container.title = "Sürüklemeyi Kapat";
        map.dragging.enable();
      } else {
        container.title = "Sürükle";
        map.dragging.disable();
      }
    });

    container.title = draggable ? "Sürüklemeyi Kapat" : "Sürükle";

    return container;
  },

  onRemove: function (map) {},
});

L.control.draggable = function (opts) {
  return new L.Control.Draggable(opts);
};
