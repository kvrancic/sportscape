import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function GoogleAddressSearch({ onSelect }) {
  const [value, setValue] = useState(null);

  const handleSelect = async (place) => {
    setValue(place);
    console.log(place);

    try {
      const results = await geocodeByAddress(place.label);
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);

      onSelect({
        address: place.label,
        coordinates: { lat, lng },
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          value,
          onChange: handleSelect,
          placeholder: 'Search for address',
          isClearable: true,
          className: 'w-full',
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
