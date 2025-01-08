
    const map = L.map('my-map').setView([47.921230, 106.918556], 12);

    L.tileLayer('https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=d6924d9c547f4f8f9d3bf06d41780f07', {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    fetch('https://api.geoapify.com/v1/geocode/search?text=Их сургуулийн гудамж - 1, Бага тойруу, Сүхбаатар дүүрэг, Улаанбаатар&apiKey=d6924d9c547f4f8f9d3bf06d41780f07')
      .then(response => response.json())
      .then(data => {
        if (data.features.length > 0) {
          const coordinates = data.features[0].geometry.coordinates;
          const lat = coordinates[1];
          const lon = coordinates[0];

          L.marker([lat, lon]).addTo(map)
            .bindPopup('Их сургуулийн гудамж - 1, Бага тойруу, Сүхбаатар дүүрэг, Улаанбаатар')
            .openPopup();

          
          map.setView([lat, lon], 15);
        } else {
          alert('Address not found!');
        }
      })
      .catch(error => console.error('Error:', error));
