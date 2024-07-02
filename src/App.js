// App.js
import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const VehiclesList = [
    { id: 1, name: "", item: "item1", lastPlaceId: 0 },
    { id: 2, name: "", item: "item2", lastPlaceId: 0 },
    { id: 3, name: "", item: "item3", lastPlaceId: 0 },
    { id: 4, name: "", item: "item4", lastPlaceId: 0 },
    { id: 5, name: "", item: "item5", lastPlaceId: 0 },
    { id: 6, name: "", item: "item6", lastPlaceId: 0 },
    { id: 7, name: "", item: "item7", lastPlaceId: 0 },
    { id: 8, name: "", item: "item8", lastPlaceId: 0 },
    { id: 9, name: "", item: "item9", lastPlaceId: 0 },
    { id: 10, name: "", item: "item10", lastPlaceId: 0 },

    { id: 11, name: "", item: "item11", lastPlaceId: 0 },
    { id: 12, name: "", item: "item12", lastPlaceId: 0 },
    { id: 13, name: "", item: "item13", lastPlaceId: 0 },
    { id: 14, name: "", item: "item14", lastPlaceId: 0 },
    { id: 15, name: "", item: "item15", lastPlaceId: 0 },
    { id: 16, name: "", item: "item16", lastPlaceId: 0 },
    { id: 17, name: "", item: "item17", lastPlaceId: 0 },
    { id: 18, name: "", item: "item18", lastPlaceId: 0 },
    { id: 19, name: "", item: "item19", lastPlaceId: 0 },
    { id: 20, name: "", item: "item20", lastPlaceId: 0 },

    { id: 21, name: "", item: "item21", lastPlaceId: 0 },
    { id: 22, name: "", item: "item22", lastPlaceId: 0 },
    { id: 23, name: "", item: "item23", lastPlaceId: 0 },
    { id: 24, name: "", item: "item24", lastPlaceId: 0 },
    { id: 25, name: "", item: "item25", lastPlaceId: 0 },
    { id: 26, name: "", item: "item26", lastPlaceId: 0 },
    { id: 27, name: "", item: "item27", lastPlaceId: 0 },
    { id: 28, name: "", item: "item28", lastPlaceId: 0 },
    { id: 29, name: "", item: "item29", lastPlaceId: 0 },
    { id: 30, name: "", item: "item30", lastPlaceId: 0 },
    // ... (otros vehículos)
  ];

  const PlacesList = [
    { id: 1, name: 'BASE 1', vehicles: [] },
    { id: 2, name: 'TABARIS', vehicles: [] },
    { id: 3, name: 'BASE 2', vehicles: [] },
    { id: 4, name: 'PARQUESITO', vehicles: [] },
    { id: 5, name: 'PUBLICA 3', vehicles: [] },
    { id: 6, name: 'SANTA MARTA', vehicles: [] },
    { id: 7, name: 'BAMQUILLA', vehicles: [] },
    { id: 8, name: 'BASE 6', vehicles: [] },
    { id: 9, name: 'BASE 7', vehicles: [] },
    { id: 10, name: 'BASE 8', vehicles: [] },
    { id: 11, name: 'BASE 5', vehicles: [] },
    { id: 12, name: 'BASE 9', vehicles: [] },
    { id: 13, name: 'BASE 10', vehicles: [] },
    { id: 14, name: 'BASE 11', vehicles: [] },
    // ... (otros lugares)
  ];

  const [vehicles, setVehicles] = useState(VehiclesList)
   
  const [places, setPlaces] = useState(PlacesList)
   
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleAddVehicle = (vehicle) => {
    if (selectedPlace !== null) {
      const updatedPlaces = [...places];
      const placeIndex = updatedPlaces.findIndex((place) => place.id === selectedPlace);

      updatedPlaces[placeIndex].vehicles.push(vehicle);
      // Actualiza el estado de lugares si es necesario
      setPlaces(updatedPlaces);

      // Elimina el vehículo de la lista de vehículos libres
      const updatedVehicles = vehicles.filter((v) => v.id !== vehicle.id);
      setVehicles(updatedVehicles);
    }
  };

  const handleAddVehicleFirst = (vehicle) => {
    if (vehicle.lastPlaceId !== 0) {
      const updatedPlaces = [...places];
      const placeIndex = updatedPlaces.findIndex((place) => place.id === vehicle.lastPlaceId);

      updatedPlaces[placeIndex].vehicles.unshift(vehicle);
      // Actualiza el estado de lugares si es necesario
      setPlaces(updatedPlaces);

      // Elimina el vehículo de la lista de vehículos libres
      const updatedVehicles = vehicles.filter((v) => v.id !== vehicle.id);
      setVehicles(updatedVehicles);
    }
  }

  const handleSelectPlace = (placeId) => {
    setSelectedPlace(placeId); // Actualiza el estado con el ID del lugar seleccionado
  };

  const handleRemoveVehicle = (vehicle) => {

    // Encuentra el lugar seleccionado
    const placeIndex = places.findIndex((place) => place.id === selectedPlace);

    const exist = places[placeIndex].vehicles.some((v) => v.id === vehicle.id);

    if (exist) {
      // Elimina el vehículo del lugar
      const updatedVehicles = places[placeIndex].vehicles.filter((v) => v.id !== vehicle.id);

      // Actualiza el estado de vehículos asignados
      const updatedPlaces = [...places];
      updatedPlaces[placeIndex].vehicles = updatedVehicles;
      setPlaces(updatedPlaces);

      const isAlreadyAssigned = vehicles.some((v) => v.id === vehicle.id);

      if (!isAlreadyAssigned) {
        vehicle.lastPlaceId = places[placeIndex].id;
        const updatedVehicles = [...vehicles, vehicle];
        setVehicles(updatedVehicles);
      }
    }
  };

  const timeoutRef = useRef(null);

  const handleButtonPress = (vehicle) => {
    timeoutRef.current = setTimeout(() => {
      // Mostrar el cuadro de confirmación
      const confirmed = window.confirm('Desea Regresar a la posicion anterior?');
      if (confirmed) {
        handleAddVehicleFirst(vehicle);
        // Realiza la acción deseada
        console.log('confirmacion aceptada');

      } else {
        console.log('confirmacion cancelada');
      }

    }, 1000); // 2000 ms = 2 segundos
  };

  const handleButtonRelease = (vehicle) => {
    clearTimeout(timeoutRef.current);
    handleAddVehicle(vehicle);
  };

  const handleStorageData = () => {
    // Guardar en localStorage
    localStorage.setItem('vehicles', VehiclesList);
    localStorage.setItem('places', PlacesList);
  };

  useEffect(() => {
    // Obtener el nombre guardado al cargar la página
    const vehiclesStorage = localStorage.getItem('vehicles');
    const placesStorage = localStorage.getItem('places');
    if (vehiclesStorage) {
      setVehicles(vehiclesStorage);
    }
    if (placesStorage) {
      setPlaces(placesStorage)
    }
  }, []);

  return (
    <div className="App">
      <div>
        
        <h2>Tabla de Vehiculos</h2>
        <div className="button-grid">
          {vehicles.map((vehicle) => (
            <button
              className={vehicle.item}
              onMouseDown={() => handleButtonPress(vehicle)}
              onMouseUp={() => handleButtonRelease(vehicle)}
            >
              {vehicle.id}
            </button>
          ))}
        </div>

        <h2>Tabla de Lugares</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }} >Lugares</th>
              <th style={{ width: '10%' }} >Seleccion</th>
              <th style={{ width: '90%' }} >Vehiculos</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr>
                <td>{place.name}</td>
                <td>
                  <input type="checkbox" checked={selectedPlace === place.id} onChange={() => handleSelectPlace(place.id)} />
                </td>
                <td>
                  <div className="button-vehicle-grid">
                    {place.vehicles.map((vehicle) => (
                      <button onClick={() => handleRemoveVehicle(vehicle)}>{vehicle.id}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <button  onClick={() => handleStorageData} >Cargas Datos</button>
      </div>
    </div>
  );
}

export default App;
