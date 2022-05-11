export const createData = (data: any[]) => {
  const eventGeo = {
    type: "FeatureCollection" as const,
    features: [] as any,
  };
  data.forEach((event: any) => {
    eventGeo.features.push({
      type: "Feature",
      properties: { id: event.id },
      geometry: {
        type: "Point",
        coordinates: [event.longitude, event.latitude],
      },
    });
  });

  return eventGeo;
};
