var A = ["H", "Li", "Na", "K"]
var B = ["F", "Cl", "Br", "I"]
var C = ["o", "S", "Se"]

var elementsArray = [];

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var compounds = await this.getCompounds();

    this.el.addEventListener("markerFound", (e) => {
      var elementName = this.el.getAttribute("element_name")
      var barcodeValue = this.el.getAttribute("value")
      elementsArray.push({element_name: elementName, barcode_value: barcodeValue})
      
      //Cambiar la visibilidad del compuesto
      compounds[barcodeValue]["compounds"].map(item =>{
        var compound = document.querySelector(`#${item.compound_name}-${barcodeValue}`)
        compound.setAttribute("visible", false)
      })

      //cambiar la visibilidad del atomo
      var atom = document.querySelector(`#${elementName}-${barcodeValue}`)
      atom.setAttribute("visible", true)
    });

    this.el.addEventListener("markerLost", (e) => {
      var elementName = this.el.getAttribute("element_name")
      var index = indexArray.findIndex(x => x.element_name === elementName)
      if(index > -1){
        elementsArray.splice(index, 1)
      }
    });
  },


  tick: function () {
    
  },
  // Calcular la distancia entre la posición de dos marcadores
  getDistance: function (elA, elB) {
    
  },  
  getCompound: function () {
    for(var al of elementsArray){
      if(A.includes(al.element_name)){
        var compound = al.element_name
        for(var el of elementsArray){
          if(B.includes(el.element_name))
            compound += el.element_name
          return {nam: compound, value: el.barcode_value}
        }
      }
    }
  },
  showCompound: function (compound) {
    // Ocultar elementos
    elementsArray.map(item => {
      var el = document.querySelector(`#${item.element_name}-${item.barcode_value}`);
      el.setAttribute("visible", false);
    });
    // Mostrar compuesto
    var compound = document.querySelector(`#${compound.name}-${compound.value}`);
    compound.setAttribute("visible", true);
  },
  getCompounds: function () {
    // Nota: utiliza el servidor de ngrok para obtener los valores JSON
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
});
