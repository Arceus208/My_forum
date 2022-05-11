import React, { useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  Popup,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import {
  EventFragmentFragment,
  useJoinEventMutation,
} from "../../generated/graphql";

import type { MapRef } from "react-map-gl";
import Pin from "../../utils/pin";
import "mapbox-gl/dist/mapbox-gl.css";

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

interface EventsMapProps {
  events: EventFragmentFragment[];
  location?: { lat: number; long: number };
  zoom: number;
}

export const EventsMap: React.FC<EventsMapProps> = ({
  events,
  location,
  zoom,
}) => {
  const [joinEventMut] = useJoinEventMutation();

  const [popupInfo, setPopupInfo] = useState<EventFragmentFragment | null>(
    null
  );

  const mapRef = useRef<MapRef>(null);
  const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_KEY;

  const pins = events.map((event) => (
    <Marker
      key={`marker-${event.id}`}
      longitude={event.longitude}
      latitude={event.latitude}
      anchor="top"
    >
      <Pin
        onClick={() => {
          mapRef.current?.easeTo({
            center: [event.longitude, event.latitude],

            duration: 500,
          });
          setPopupInfo(event);
        }}
      />
    </Marker>
  ));

  return (
    <Box h={700} w={["90vw", "90vw", "90vw", "70vw"]} p={5}>
      {location && (
        <Map
          initialViewState={{
            latitude: location.lat,
            longitude: location.long,
            zoom: zoom,
            bearing: 0,
            pitch: 0,
          }}
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={accessToken}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          {pins}
          {popupInfo && (
            <Popup
              anchor="bottom"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              closeOnClick={false}
              closeButton={false}
              onClose={() => setPopupInfo(null)}
            >
              <Box>
                <Image src={popupInfo.image}></Image>
                <Text fontSize={15} font fontWeight={700} mt={3}>
                  {popupInfo.name}
                </Text>
                <Text borderBottomWidth={1}>{popupInfo.description}</Text>
                <Text mt={2}>Location: {popupInfo.location}</Text>
                <Text>Date: {popupInfo.eventDate}</Text>
                <Text>Time: {popupInfo.eventTime}</Text>

                <Flex justify="center" mt={2}>
                  <Button
                    size="sm"
                    onClick={() => {
                      setPopupInfo(null);
                    }}
                    fontSize={13}
                    mr={2}
                  >
                    Hide
                  </Button>
                  <Button
                    size="sm"
                    onClick={async () => {
                      await joinEventMut({
                        variables: { eventId: popupInfo.id },
                      });
                    }}
                    fontSize={13}
                    colorScheme="blue"
                  >
                    Join
                  </Button>
                </Flex>
              </Box>
            </Popup>
          )}
        </Map>
      )}
    </Box>
  );
};
