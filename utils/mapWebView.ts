export const generateHtmlContent = (latitude: number, longitude: number, draggable: boolean) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=4dd06c601b4ff6238199421638230939&libraries=services"></script>
      <style>
        body { margin: 0; padding: 0; height: 100%; }
        html { height: 100%; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        window.onload = function() {
          console.log('Kakao Map API Loaded');
          if (typeof kakao !== 'undefined' && kakao.maps) {
            console.log('Kakao Maps is available');
            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: 3
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);

            map.setDraggable(${draggable});

            const markerImageSrc = "https://cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com/image/KakaoTalk_Photo_2025-06-09-13-37-27.png";
            const markerImageSize = new kakao.maps.Size(32, 32); // 마커 이미지 크기
            const markerImageOption = {
              offset: new kakao.maps.Point(12, 35) // 이미지 중심
            };
            const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOption);

            const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
            const marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage
            });
            marker.setMap(map);
          } else {
            console.error('Kakao Maps is not available');
          }
        };
      </script>
    </body>
  </html>
`;
