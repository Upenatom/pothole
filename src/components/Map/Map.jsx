import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet';
import Getclick from './Getclick'
import Flyto from './Flyto'

import './Map.css'
import { iconSelect } from '../../utilities/iconSelector'


export default function Map({ setPosition, statePosition, ticketItems, formCheck, handleMarkerClickSearch }) {

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(50, 50, true),
    });
  };


  return (

    <MapContainer
      center={statePosition}
      zoom={13}
      scrollWheelZoom={true}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {ticketItems.map(ticket =>
          <Marker key={ticket._id}
            position={[ticket.lat, ticket.long]}
            icon={iconSelect(ticket.category)}
            eventHandlers={{
              click: () => { handleMarkerClickSearch(ticket._id, ticket.lat, ticket.long) }
            }}
          >
            <Flyto position={statePosition} />

            <Popup >
              <b>{ticket.category}</b> <br />
              {ticket.title}
            </Popup>
          </Marker>)}
      </MarkerClusterGroup>
      {/* This is to make Sure get click and selection marker only works on form page*/}
      {formCheck ?
        <Getclick setPosition={setPosition} statePosition={statePosition} />
        : null}

      {formCheck ? <Marker position={statePosition} ></Marker> : null}


    </MapContainer>

  );
}