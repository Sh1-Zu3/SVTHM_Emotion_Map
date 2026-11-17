
/* ==========================================
   1. KIỂM TRA THƯ VIỆN
========================================== */

if (typeof L === "undefined") {
    throw new Error("Leaflet chưa được tải!");
}

if (typeof L.heatLayer !== "function") {
    throw new Error(
        "Leaflet.heat chưa được tải! Hãy kiểm tra CDN trong index.html."
    );
}

if (typeof L.markerClusterGroup !== "function") {
    throw new Error(
        "Leaflet.markercluster chưa được tải! Hãy kiểm tra CDN trong index.html."
    );
}

console.log("Leaflet:", L.version);
console.log("Leaflet.heat đã được tải thành công!");



/* ==========================================
   2. CẤU HÌNH BẢN ĐỒ
========================================== */

const CENTER_LAT = 10.875;
const CENTER_LNG = 106.801;

const INITIAL_ZOOM = 15;



/* ==========================================
   3. CẤU HÌNH CẢM XÚC
========================================== */

const emotionConfig = {

    happy: {
        icon: "😊",
        label: "Vui vẻ",
        color: "#22c55e"
    },

    sad: {
        icon: "😢",
        label: "Buồn",
        color: "#3b82f6"
    },

    neutral: {
        icon: "😐",
        label: "Bình thường",
        color: "#a3a3a3"
    },

    stressed: {
        icon: "😫",
        label: "Căng thẳng",
        color: "#ef4444"
    }

};



/* ==========================================
   4. DỮ LIỆU CẢM XÚC MẪU
========================================== */

// count: số lượt ghi nhận cảm xúc
// emotion: loại cảm xúc
// lat: vĩ độ
// lng: kinh độ

const emotionData = [

     // KHU VỰC ĐẠI HỌC
    { name: "KTX Khu A", lat: 10.8760, lng: 106.8000, emotion: "happy", count: 3 },
    { name: "KTX Khu B", lat: 10.8770, lng: 106.8020, emotion: "sad", count: 1 },
    { name: "KTX Khu C", lat: 10.8780, lng: 106.8040, emotion: "stressed", count: 10 },
    { name: "Nhà ăn KTX", lat: 10.8750, lng: 106.8030, emotion: "happy", count: 2 },
    { name: "UIT", lat: 10.8700, lng: 106.8010, emotion: "neutral", count: 5 },
    { name: "HCMUS", lat: 10.8730, lng: 106.7980, emotion: "happy", count: 1 },
    { name: "HCMUT", lat: 10.8710, lng: 106.8050, emotion: "stressed", count: 2 },
    { name: "UEL", lat: 10.8750, lng: 106.8060, emotion: "sad", count: 10 },
    { name: "Thư viện", lat: 10.8720, lng: 106.8020, emotion: "neutral", count: 4 },
    { name: "Khu tự học", lat: 10.8740, lng: 106.7990, emotion: "neutral", count: 6 },
    { name: "Phòng học A", lat: 10.8690, lng: 106.8030, emotion: "sad", count: 10 },
    { name: "Khu nghiên cứu", lat: 10.8680, lng: 106.8000, emotion: "neutral", count: 4 },
    { name: "Phòng máy tính", lat: 10.8700, lng: 106.7980, emotion: "stressed", count: 10 },
    { name: "Quán cà phê A", lat: 10.8740, lng: 106.8050, emotion: "happy", count: 3 },
    { name: "Cửa hàng", lat: 10.8760, lng: 106.8070, emotion: "neutral", count: 1 },
    { name: "Công viên", lat: 10.8790, lng: 106.7990, emotion: "happy", count: 2 },
    { name: "Sân thể thao", lat: 10.8800, lng: 106.8020, emotion: "happy", count: 7 },
    { name: "Quán cà phê B", lat: 10.8810, lng: 106.8050, emotion: "sad", count: 4 },
    { name: "Đường T2", lat: 10.8720, lng: 106.8070, emotion: "stressed", count: 2 },
    { name: "Đường nội bộ A", lat: 10.8670, lng: 106.8040, emotion: "neutral", count: 1 },
    { name: "Đường nội bộ B", lat: 10.8660, lng: 106.8010, emotion: "sad", count: 10 },
    { name: "Đường khu đại học", lat: 10.8680, lng: 106.8060, emotion: "happy", count: 2 },
    { name: "Ngã tư trung tâm", lat: 10.8740, lng: 106.8100, emotion: "stressed", count: 2 },
    { name: "Quảng trường", lat: 10.8780, lng: 106.8070, emotion: "happy", count: 6 },
    { name: "Bến xe buýt", lat: 10.8810, lng: 106.8080, emotion: "neutral", count: 1 },
    { name: "Khu sinh hoạt chung", lat: 10.8830, lng: 106.8010, emotion: "happy", count: 1 },
    { name: "Hội trường", lat: 10.8840, lng: 106.8040, emotion: "stressed", count: 6 },
    { name: "Triển lãm", lat: 10.8850, lng: 106.8070, emotion: "neutral", count: 3 },
    { name: "Khu thể dục", lat: 10.8860, lng: 106.8000, emotion: "happy", count: 5 },
    { name: "Khu nghỉ ngơi", lat: 10.8870, lng: 106.8030, emotion: "sad", count: 7 },
    { name: "Khu ăn uống", lat: 10.8880, lng: 106.8060, emotion: "happy", count: 2 },
    { name: "Gửi xe", lat: 10.8890, lng: 106.8090, emotion: "stressed", count: 1 },
    { name: "Nhà văn hóa", lat: 10.8900, lng: 106.8020, emotion: "neutral", count: 1 },
    { name: "Yên tĩnh A", lat: 10.8910, lng: 106.8050, emotion: "sad", count: 3 },
    { name: "Đông người A", lat: 10.8920, lng: 106.8080, emotion: "stressed", count: 5 },
    { name: "Yên tĩnh B", lat: 10.8930, lng: 106.8010, emotion: "neutral", count: 6 },
    { name: "Đông người B", lat: 10.8940, lng: 106.8040, emotion: "stressed", count: 2 },
    { name: "Sinh hoạt ngoài trời", lat: 10.8950, lng: 106.8070, emotion: "happy", count: 3 },
    { name: "Khu vực hồ đá", lat: 10.8960, lng: 106.8050, emotion: "neutral", count: 1 },
    { name: "Khu vực nhà xe", lat: 10.8970, lng: 106.8090, emotion: "stressed", count: 1 },

        // LINH TRUNG - LINH XUÂN
    { name: "Khu dân cư Linh Trung", lat: 10.8700, lng: 106.7730, emotion: "happy", count: 8 },
    { name: "Khu vực đường Hoàng Diệu 2", lat: 10.8670, lng: 106.7710, emotion: "stressed", count: 6 },
    { name: "Khu vực Linh Xuân", lat: 10.8750, lng: 106.7580, emotion: "neutral", count: 4 },
    { name: "Ngã tư Linh Xuân", lat: 10.8760, lng: 106.7560, emotion: "stressed", count: 9 },
    { name: "Khu vực đường số 6 Linh Trung", lat: 10.8640, lng: 106.7790, emotion: "happy", count: 7 },
    { name: "Khu dân cư đường Kha Vạn Cân", lat: 10.8610, lng: 106.7660, emotion: "neutral", count: 5 },

    // TAM BÌNH - TAM PHÚ - BÌNH CHIỂU
    { name: "Khu vực chợ Tam Bình", lat: 10.8770, lng: 106.7330, emotion: "happy", count: 9 },
    { name: "Khu dân cư Tam Phú", lat: 10.8580, lng: 106.7440, emotion: "neutral", count: 5 },
    { name: "Khu vực đường Tô Ngọc Vân", lat: 10.8510, lng: 106.7500, emotion: "stressed", count: 7 },
    { name: "Khu dân cư Bình Chiểu", lat: 10.8830, lng: 106.7420, emotion: "happy", count: 6 },
    { name: "Khu vực cầu vượt Gò Dưa", lat: 10.8660, lng: 106.7470, emotion: "stressed", count: 10 },
    { name: "Khu vực đường Ngô Chí Quốc", lat: 10.8840, lng: 106.7540, emotion: "neutral", count: 4 },

    // HIỆP BÌNH CHÁNH - HIỆP BÌNH PHƯỚC
    { name: "Khu dân cư Hiệp Bình Chánh", lat: 10.8270, lng: 106.7270, emotion: "happy", count: 9 },
    { name: "Khu vực đường Phạm Văn Đồng", lat: 10.8320, lng: 106.7240, emotion: "stressed", count: 10 },
    { name: "Khu vực chợ Hiệp Bình", lat: 10.8380, lng: 106.7300, emotion: "happy", count: 8 },
    { name: "Khu dân cư Hiệp Bình Phước", lat: 10.8420, lng: 106.7180, emotion: "neutral", count: 5 },
    { name: "Khu vực cầu Bình Triệu", lat: 10.8140, lng: 106.7110, emotion: "stressed", count: 10 },
    { name: "Khu vực đường Quốc lộ 13", lat: 10.8330, lng: 106.7150, emotion: "stressed", count: 8 },

    // LINH ĐÔNG - LINH TÂY - BÌNH THỌ
    { name: "Khu dân cư Linh Đông", lat: 10.8420, lng: 106.7580, emotion: "happy", count: 7 },
    { name: "Khu vực đường Phạm Văn Đồng Linh Đông", lat: 10.8400, lng: 106.7500, emotion: "neutral", count: 4 },
    { name: "Khu vực Linh Tây", lat: 10.8520, lng: 106.7650, emotion: "happy", count: 8 },
    { name: "Khu vực đường Võ Văn Ngân", lat: 10.8510, lng: 106.7610, emotion: "stressed", count: 9 },
    { name: "Khu vực Bình Thọ", lat: 10.8490, lng: 106.7580, emotion: "neutral", count: 6 },
    { name: "Khu vực chợ Thủ Đức", lat: 10.8500, lng: 106.7550, emotion: "happy", count: 10 },

    // TĂNG NHƠN PHÚ - PHƯỚC LONG
    { name: "Khu dân cư Tăng Nhơn Phú A", lat: 10.8380, lng: 106.7900, emotion: "happy", count: 8 },
    { name: "Khu dân cư Tăng Nhơn Phú B", lat: 10.8250, lng: 106.7900, emotion: "neutral", count: 5 },
    { name: "Khu vực đường Lê Văn Việt", lat: 10.8410, lng: 106.7790, emotion: "stressed", count: 10 },
    { name: "Khu vực Phước Long A", lat: 10.8150, lng: 106.7800, emotion: "happy", count: 7 },
    { name: "Khu vực Phước Long B", lat: 10.8080, lng: 106.7850, emotion: "neutral", count: 4 },
    { name: "Khu vực đường Đỗ Xuân Hợp", lat: 10.8150, lng: 106.7750, emotion: "stressed", count: 9 },

    // AN PHÚ - THẢO ĐIỀN - BÌNH AN
    { name: "Khu vực Thảo Điền", lat: 10.8030, lng: 106.7320, emotion: "happy", count: 10 },
    { name: "Khu vực đường Xuân Thủy", lat: 10.8040, lng: 106.7340, emotion: "happy", count: 8 },
    { name: "Khu vực An Phú", lat: 10.8000, lng: 106.7500, emotion: "neutral", count: 6 },
    { name: "Khu vực đường Song Hành", lat: 10.8030, lng: 106.7550, emotion: "stressed", count: 9 },
    { name: "Khu dân cư Bình An", lat: 10.7970, lng: 106.7420, emotion: "happy", count: 7 },
    { name: "Khu vực cầu Sài Gòn phía Thủ Đức", lat: 10.8010, lng: 106.7180, emotion: "stressed", count: 10 },

    // CÁT LÁI - THẠNH MỸ LỢI - PHÚ HỮU
    { name: "Khu vực Cát Lái", lat: 10.7730, lng: 106.7900, emotion: "neutral", count: 5 },
    { name: "Khu dân cư Thạnh Mỹ Lợi", lat: 10.7700, lng: 106.7560, emotion: "happy", count: 8 },
    { name: "Khu vực đường Đồng Văn Cống", lat: 10.7680, lng: 106.7700, emotion: "stressed", count: 10 },
    { name: "Khu vực Phú Hữu", lat: 10.7900, lng: 106.7900, emotion: "neutral", count: 5 },

    // LONG TRƯỜNG - LONG BÌNH
    { name: "Khu dân cư Long Trường", lat: 10.7950, lng: 106.8200, emotion: "happy", count: 7 },
    { name: "Khu vực Long Bình", lat: 10.8580, lng: 106.8350, emotion: "neutral", count: 6 }

];



/* ==========================================
   5. CẤU HÌNH HEATMAP
========================================== */

// Số lượt ghi nhận tương ứng với intensity = 1

const HEATMAP_MAX_COUNT = 60;


// Cấu hình màu sắc

const heatGradient = {

    0.1: "#0000ff",

    0.25: "#00ffff",

    0.45: "#00ff00",

    0.65: "#ffff00",

    0.8: "#ff8000",

    1.0: "#ff0000"

};


// Cấu hình bán kính Heatmap

const HEAT_RADIUS = 35;

const HEAT_BLUR = 25;



/* ==========================================
   6. KHỞI TẠO BẢN ĐỒ
========================================== */

const map = L.map("map", {
    minZoom: 13,
    maxZoom: 19,
    maxBoundsViscosity: 1.0
}).setView([CENTER_LAT, CENTER_LNG], 15);


// Bản đồ nền OpenStreetMap

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }
).addTo(map);


/* ==========================================
   GIỚI HẠN BẢN ĐỒ TRONG KHU VỰC THỦ ĐỨC
========================================== */

let thuDucBoundary = null;

fetch("data/thuduc.geojson")
    .then(response => {
        if (!response.ok) {
            throw new Error("Không tải được GeoJSON Thủ Đức");
        }

        return response.json();
    })
    .then(geojson => {

        // Vẽ ranh giới Thủ Đức
        thuDucBoundary = L.geoJSON(geojson, {
            style: {
                color: "#1d4ed8",
                weight: 3,
                opacity: 1,
                fillColor: "#3b82f6",
                fillOpacity: 0.04
            }
        }).addTo(map);

        // Lấy phạm vi ranh giới
        const bounds = thuDucBoundary.getBounds();

        // Tự động căn bản đồ theo Thủ Đức
        map.fitBounds(bounds, {
            padding: [20, 20],
            maxZoom: 14
        });

        // Giới hạn khu vực kéo bản đồ
        map.setMaxBounds(bounds.pad(0.03));

    })
    .catch(error => {
        console.error("Lỗi tải ranh giới:", error);
    });



/* ==========================================
   7. KHỞI TẠO CÁC LAYER
========================================== */

// Layer chứa các biểu tượng cảm xúc

// Layer chứa các biểu tượng cảm xúc
// Tự động gom các marker thành cụm khi zoom out

const moodLayer = L.markerClusterGroup({

    chunkedLoading: true,

    showCoverageOnHover: false,

    spiderfyOnMaxZoom: true,

    zoomToBoundsOnClick: true,

    removeOutsideVisibleBounds: true,

    maxClusterRadius: 160,

    disableClusteringAtZoom: 20,

    iconCreateFunction: function(cluster) {

        const markers = cluster.getAllChildMarkers();

        // Tổng lượt ghi nhận của từng cảm xúc
        const emotionCounts = {
            happy: 0,
            sad: 0,
            neutral: 0,
            stressed: 0
        };

        // Tổng lượt ghi nhận của toàn bộ cụm
        let totalCount = 0;

        markers.forEach(marker => {

            const emotion = marker.options.emotion;

            const count = Math.max(
                Number(marker.options.count) || 0,
                0
            );

            // Cộng tổng số lượt ghi nhận
            totalCount += count;

            // Cộng lượt ghi nhận theo cảm xúc
            if (emotionCounts[emotion] !== undefined) {
                emotionCounts[emotion] += count;
            }

        });

        // Tìm cảm xúc có tổng lượt ghi nhận cao nhất
        const dominantEmotion = Object.keys(emotionCounts)
            .reduce((a, b) =>
                emotionCounts[a] >= emotionCounts[b] ? a : b
            );

        const config = emotionConfig[dominantEmotion];

        return L.divIcon({

            html: `
                <div class="emotion-cluster-inner"
                    style="background: ${config.color};">

                    <span class="emotion-cluster-icon">
                        ${config.icon}
                    </span>

                    <span class="emotion-cluster-count">
                        ${totalCount.toLocaleString("vi-VN")}
                    </span>

                </div>
            `,

            className: "emotion-cluster",

            iconSize: [52, 52],

            iconAnchor: [26, 26]

        });
    }

});


// Layer chứa Heatmap

let heatLayer = null;


// Layer chứa vị trí người dùng

const locationLayer = L.layerGroup().addTo(map);


// Chế độ mặc định

let currentMode = "heatmap";



/* ==========================================
   8. TẠO DỮ LIỆU HEATMAP
========================================== */

function prepareHeatData() {

    return emotionData.map(item => {

        const count = Math.max(
            Number(item.count) || 0,
            0
        );

        const intensity = Math.min(
            count / HEATMAP_MAX_COUNT,
            1
        );

        return [
            item.lat,
            item.lng,
            intensity
        ];

    });

}



/* ==========================================
   9. KHỞI TẠO HEATMAP
========================================== */

function createHeatmap() {

    const heatData = prepareHeatData();

    console.log("Heatmap data:", heatData);

    heatLayer = L.heatLayer(heatData, {

        radius: HEAT_RADIUS,

        blur: HEAT_BLUR,

        max: 1,

        maxZoom: 17,

        minOpacity: 0.3,

        gradient: heatGradient

    });

}



/* ==========================================
   10. CẬP NHẬT HEATMAP
========================================== */

function updateHeatmap() {

    const heatData = prepareHeatData();

    if (heatData.length === 0) {
        return;
    }

    // Nếu Heatmap chưa được tạo thì khởi tạo

    if (heatLayer === null) {

        createHeatmap();

    } else {

        // Nếu đã tồn tại thì cập nhật dữ liệu

        heatLayer.setLatLngs(heatData);

    }

}



/* ==========================================
   11. KÍCH THƯỚC ICON THEO ZOOM
========================================== */

function getIconSize(zoom) {

    if (zoom <= 13) return 18;

    if (zoom <= 15) return 24;

    if (zoom <= 17) return 30;

    return 36;

}



/* ==========================================
   12. TẠO ICON CẢM XÚC
========================================== */

function createMoodIcon(item, size) {

    const config = emotionConfig[item.emotion];

    if (!config) {
        return null;
    }

    return L.divIcon({

        className: "mood-pin-wrapper",

        html: `
            <div
                class="mood-pin"
                style="--emotion-color: ${config.color};"
            >
                ${config.icon}
            </div>
        `,

        iconSize: [size, size],

        iconAnchor: [size / 2, size / 2],

        popupAnchor: [0, -size / 2]

    });

}



/* ==========================================
   13. TẠO MOOD PINS
========================================== */

function renderMoodPins() {

    moodLayer.clearLayers();

    const zoom = map.getZoom();

    const size = getIconSize(zoom);

    // Không hiển thị icon khi zoom quá xa

    if (size === 0) {
        return;
    }

    emotionData.forEach(item => {

        const config = emotionConfig[item.emotion];

        if (!config) {
            return;
        }

        const icon = createMoodIcon(item, size);

        const marker = L.marker([item.lat, item.lng], {
            icon: icon,
            emotion: item.emotion,
            count: item.count
        });

        // Nội dung popup

        marker.bindPopup(`
            <div class="emotion-popup">

                <h3>${item.name}</h3>

                <p>
                    <strong>Cảm xúc:</strong>
                    ${config.icon} ${config.label}
                </p>

                <p>
                    <strong>Số lượt ghi nhận:</strong>
                    ${item.count}
                </p>

            </div>
        `);

        moodLayer.addLayer(marker);

    });

}



/* ==========================================
   14. XÓA CÁC LAYER CẢM XÚC
========================================== */

function removeEmotionLayers() {

    if (map.hasLayer(moodLayer)) {
        map.removeLayer(moodLayer);
    }

    if (
        heatLayer !== null &&
        map.hasLayer(heatLayer)
    ) {
        map.removeLayer(heatLayer);
    }

}



/* ==========================================
   15. CẬP NHẬT NÚT ACTIVE
========================================== */

function updateActiveButton(activeId) {

    document.querySelectorAll(".control-btn").forEach(button => {

        button.classList.remove("active");

    });

    const activeButton = document.getElementById(activeId);

    if (activeButton) {
        activeButton.classList.add("active");
    }

}



/* ==========================================
   16. CHẾ ĐỘ PINS
========================================== */

function showMoodPins() {

    currentMode = "pins";

    removeEmotionLayers();

    renderMoodPins();

    moodLayer.addTo(map);

    updateActiveButton("showPins");

}



/* ==========================================
   17. CHẾ ĐỘ HEATMAP
========================================== */

function showHeatmap() {

    currentMode = "heatmap";

    removeEmotionLayers();

    updateHeatmap();

    heatLayer.addTo(map);

    updateActiveButton("showHeatmap");

}



/* ==========================================
   18. CHẾ ĐỘ BOTH
========================================== */

function showBoth() {

    currentMode = "both";

    removeEmotionLayers();

    renderMoodPins();

    moodLayer.addTo(map);

    updateHeatmap();

    heatLayer.addTo(map);

    updateActiveButton("showBoth");

}



/* ==========================================
   19. XỬ LÝ SỰ KIỆN ZOOM
========================================== */

map.on("zoomend", function() {

    // MarkerCluster tự động gom và tách cụm.
    // Không cần xóa và tạo lại toàn bộ marker khi zoom.

});



/* ==========================================
   20. ĐỊNH VỊ NGƯỜI DÙNG
========================================== */

let userMarker = null;

let accuracyCircle = null;


function locateUser() {

    if (!navigator.geolocation) {

        alert("Trình duyệt không hỗ trợ định vị!");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;

            const lng = position.coords.longitude;

            const accuracy = position.coords.accuracy;


            // Xóa vị trí cũ

            locationLayer.clearLayers();


            // Tạo icon vị trí người dùng

            const userIcon = L.divIcon({

                className: "",

                html: `
                    <div class="my-location"></div>
                `,

                iconSize: [18, 18],

                iconAnchor: [9, 9]

            });


            // Marker vị trí người dùng

            userMarker = L.marker(
                [lat, lng],
                {
                    icon: userIcon
                }
            ).addTo(locationLayer);


            userMarker.bindPopup(
                "📍 Vị trí hiện tại của bạn"
            );


            // Vòng tròn độ chính xác

            accuracyCircle = L.circle(
                [lat, lng],
                {
                    radius: accuracy,

                    color: "#2563eb",

                    fillColor: "#3b82f6",

                    fillOpacity: 0.12,

                    weight: 1
                }
            ).addTo(locationLayer);


            // Di chuyển bản đồ tới vị trí người dùng

            map.flyTo(
                [lat, lng],
                16,
                {
                    duration: 1.5
                }
            );


            userMarker.openPopup();

        },

        function(error) {

            let message = "Không thể xác định vị trí.";

            if (error.code === 1) {
                message = "Bạn chưa cấp quyền truy cập vị trí.";
            }

            if (error.code === 2) {
                message = "Không xác định được vị trí hiện tại.";
            }

            if (error.code === 3) {
                message = "Yêu cầu định vị đã hết thời gian.";
            }

            alert(message);

        },

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0
        }

    );

}

function filterEmotionData() {

    if (!thuDucBoundary) {
        return [];
    }

    return emotionData.filter(item => {

        const point = L.latLng(item.lat, item.lng);

        return thuDucBoundary
            .getBounds()
            .contains(point);

    });

}



/* ==========================================
   21. GẮN SỰ KIỆN CHO CÁC NÚT
========================================== */

document
    .getElementById("showPins")
    .addEventListener("click", showMoodPins);


document
    .getElementById("showHeatmap")
    .addEventListener("click", showHeatmap);


document
    .getElementById("showBoth")
    .addEventListener("click", showBoth);


document
    .getElementById("locateMe")
    .addEventListener("click", locateUser);



/* ==========================================
   22. KHỞI CHẠY DỰ ÁN
========================================== */

// Mặc định hiển thị Heatmap

showHeatmap();
