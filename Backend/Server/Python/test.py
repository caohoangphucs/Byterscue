import requests
import json
MAP_API_KEY = "AIzaSyA-0bMo6BMA8sOx-oDjeEBYOPXAwzFnYfo"
def get_street_view_url(coor):
    lat = coor[0]
    long = coor[1]
    script_url  = f"https://maps.googleapis.com/maps/api/js?key={MAP_API_KEY}&callback=initStreetView"
    script = requests.get(script_url).text
    script2 = """
    function initStreetView() {
            var location = { lat: _USERLATITUTE, lng: _USERLONGTITUTE }; // Hồ Gươm, Hà Nội

            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('street-view'),
                {
                    position: location,
                    pov: { heading: 165, pitch: 0 },
                    zoom: 1
                }
            );
        }
    """
    script2 = script2.replace("_USERLATITUTE", str(lat)).replace("_USERLONGTITUTE", str(long))
    full_script = script + script2
    return full_script
print(get_street_view_url([20.028511, 105.854444]))
    