const showMarksBtn = document.querySelector(".__show_marks");

//initialize the icons and markers start
let circleIcon = L.icon({
  iconUrl: "./circle.png",
  iconSize: [40, 40],
});
let LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});
let greenIcon = new LeafIcon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  }),
  redIcon = new LeafIcon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  }),
  orangeIcon = new LeafIcon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
  });

let marker = [];
let items = [];

//initialize the icons and markers end

//getting the user's location start
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      //getting the user's location end

      //generating random locations for the marker
      for (i = 0; i < Math.random() * 20 + 10; i++) {
        items.push({
          lat: `${latitude - Math.random()}`,
          lon: `${longitude - Math.random()}`,
        });
      }

      const map = L.map("map").setView([latitude, longitude], 13);

      // add measurement

      L.control.polylineMeasure(options).addTo(map);

      //

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //generating random locations for the icons
      for (i = 0; i < items.length / 3; i++) {
        L.marker([latitude - Math.random(), longitude - Math.random()], {
          icon: greenIcon,
        })
          .addTo(map)
          .bindPopup("I am a green leaf.");
        L.marker([latitude - Math.random(), longitude - Math.random()], {
          icon: redIcon,
        })
          .addTo(map)
          .bindPopup("I am a red leaf.");
        L.marker([latitude - Math.random(), longitude - Math.random()], {
          icon: orangeIcon,
        })
          .addTo(map)
          .bindPopup("I am an orange leaf.");
      }

      //showing and hiding the markers

      showMarksBtn.addEventListener("click", () => {
        for (i = 0; i < items.length; i++) {
          let createMarker = L.marker([items[i].lat, items[i].lon], {
            icon: circleIcon,
          });
          marker.push(createMarker);
          map.addLayer(marker[i]);
        }
        if (showMarksBtn.innerText === "Show marks") {
          showMarksBtn.innerText = "Hide marks";
        } else {
          showMarksBtn.innerText = "Show marks";
          for (i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
        }
      });
    },

    function (error) {
      alert("Could not get current position");
    }
  );
