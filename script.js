
// ==========================================
// 1. KIỂM TRA THƯ VIỆN
// ==========================================

if (typeof L === "undefined") {
    throw new Error("Leaflet chưa được tải!");
}

if (typeof L.heatLayer !== "function") {
    throw new Error("Leaflet.heat chưa được tải!");
}

console.log("Leaflet:", L.version);
console.log("Leaflet.heat đã được tải thành công!");
console.log("Regional Emotion Map đang khởi tạo...");


// ==========================================
// 2. CẤU HÌNH BẢN ĐỒ
// ==========================================

const CENTER_LAT = 10.875;
const CENTER_LNG = 106.801;

const INITIAL_ZOOM = 15;

const NEARBY_RADIUS = 1500;


// ==========================================
// 3. CẤU HÌNH CẢM XÚC
// ==========================================

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


// ==========================================
// 4. DỮ LIỆU CẢM XÚC MẪU
// ==========================================

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


// ==========================================
// 5. CẤU HÌNH HEATMAP
// ==========================================

const HEATMAP_MAX_COUNT = 60;

const HEAT_RADIUS = 35;

const HEAT_BLUR = 25;

const heatGradient = {

    0.1: "#0000ff",
    0.25: "#00ffff",
    0.45: "#00ff00",
    0.65: "#ffff00",
    0.8: "#ff8000",
    1.0: "#ff0000"

};


// ==========================================
// 6. KHỞI TẠO BẢN ĐỒ
// ==========================================

const map = L.map("map", {

    minZoom: 13,

    maxZoom: 19,

    maxBoundsViscosity: 1.0

}).setView(
    [CENTER_LAT, CENTER_LNG],
    INITIAL_ZOOM
);


// Bản đồ nền OpenStreetMap

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

        maxZoom: 19
    }
).addTo(map);


// ==========================================
// 7. RANH GIỚI THỦ ĐỨC
// ==========================================

// Chỉ dùng GeoJSON để xác định phạm vi.
// Không thêm GeoJSON lên bản đồ nên không có đường viền.

let thuDucGeoJSON = null;

let thuDucBounds = null;

let boundaryReady = false;


// Chú ý: tên file phải trùng với file thực tế trong thư mục data.

fetch("data/ThuDucCity_boundary.json")

    .then(response => {

        if (!response.ok) {
            throw new Error("Không tải được GeoJSON Thủ Đức");
        }

        return response.json();

    })

    .then(geojson => {

        thuDucGeoJSON = geojson;

        // Tạo layer tạm để lấy bounds.
        // Không gọi addTo(map).

        const boundaryLayer = L.geoJSON(geojson);

        thuDucBounds = boundaryLayer.getBounds();

        if (!thuDucBounds.isValid()) {
            throw new Error("Dữ liệu ranh giới không hợp lệ!");
        }

        boundaryReady = true;

        // Đưa bản đồ về phạm vi Thủ Đức.

        map.fitBounds(thuDucBounds, {
            padding: [20, 20],
            maxZoom: 14
        });

        // Giới hạn phạm vi kéo bản đồ.

        map.setMaxBounds(thuDucBounds.pad(0.03));

        console.log("Đã tải phạm vi Thủ Đức.");

        refreshCurrentMode();

    })

    .catch(error => {

        console.error("Lỗi tải ranh giới:", error);

        console.warn(
            "Ứng dụng tạm thời sử dụng toàn bộ dữ liệu mẫu."
        );

        refreshCurrentMode();

    });


// ==========================================
// 8. KIỂM TRA ĐIỂM NẰM TRONG ĐA GIÁC
// ==========================================

// Tọa độ GeoJSON có thứ tự [longitude, latitude].

function pointInRing(point, ring) {

    const x = point[0];

    const y = point[1];

    let inside = false;

    for (
        let i = 0, j = ring.length - 1;
        i < ring.length;
        j = i++
    ) {

        const xi = ring[i][0];

        const yi = ring[i][1];

        const xj = ring[j][0];

        const yj = ring[j][1];

        const intersects =

            ((yi > y) !== (yj > y)) &&

            (
                x <
                ((xj - xi) * (y - yi)) /
                (yj - yi) + xi
            );

        if (intersects) {
            inside = !inside;
        }

    }

    return inside;

}


function pointInPolygon(point, polygonCoordinates) {

    if (!polygonCoordinates || polygonCoordinates.length === 0) {
        return false;
    }

    // Vòng đầu tiên là vùng bên trong.

    const insideOuterRing = pointInRing(
        point,
        polygonCoordinates[0]
    );

    if (!insideOuterRing) {
        return false;
    }

    // Các vòng tiếp theo là vùng bị khoét ra.

    for (
        let i = 1;
        i < polygonCoordinates.length;
        i++
    ) {

        if (pointInRing(point, polygonCoordinates[i])) {
            return false;
        }

    }

    return true;

}


function pointInGeometry(point, geometry) {

    if (!geometry) {
        return false;
    }

    if (geometry.type === "Polygon") {

        return pointInPolygon(
            point,
            geometry.coordinates
        );

    }

    if (geometry.type === "MultiPolygon") {

        return geometry.coordinates.some(polygon => {

            return pointInPolygon(point, polygon);

        });

    }

    if (geometry.type === "GeometryCollection") {

        return geometry.geometries.some(item => {

            return pointInGeometry(point, item);

        });

    }

    return false;

}


function isInsideThuDuc(item) {

    // Khi GeoJSON chưa tải xong,
    // tạm thời không loại bỏ dữ liệu.

    if (!boundaryReady || !thuDucGeoJSON) {
        return true;
    }

    const point = [
        item.lng,
        item.lat
    ];

    function checkFeature(feature) {

        return pointInGeometry(
            point,
            feature.geometry
        );

    }

    if (thuDucGeoJSON.type === "FeatureCollection") {

        return thuDucGeoJSON.features.some(checkFeature);

    }

    if (thuDucGeoJSON.type === "Feature") {

        return checkFeature(thuDucGeoJSON);

    }

    return pointInGeometry(
        point,
        thuDucGeoJSON
    );

}


// ==========================================
// 9. BỘ LỌC CẢM XÚC
// ==========================================

let currentEmotionFilter = "all";


function getAreaData() {

    return emotionData.filter(item => {

        return isInsideThuDuc(item);

    });

}


function getFilteredEmotionData() {

    return getAreaData().filter(item => {

        if (currentEmotionFilter === "all") {
            return true;
        }

        return item.emotion === currentEmotionFilter;

    });

}


// ==========================================
// 10. TÍNH TOÁN THỐNG KÊ CẢM XÚC
// ==========================================

function calculateEmotionStats(data) {

    const stats = {

        happy: 0,

        sad: 0,

        neutral: 0,

        stressed: 0

    };

    data.forEach(item => {

        if (stats[item.emotion] !== undefined) {

            stats[item.emotion] +=
                Math.max(Number(item.count) || 0, 0);

        }

    });

    return stats;

}


function updateEmpathyStats() {

    const statsElement = document.getElementById("empathyStats");

    const messageElement = document.getElementById("empathyMessage");

    if (!statsElement || !messageElement) {
        return;
    }

    const filteredData = getFilteredEmotionData();

    const stats = calculateEmotionStats(filteredData);

    const total = Object.values(stats).reduce(
        (sum, value) => sum + value,
        0
    );

    if (total === 0) {

        messageElement.textContent =
            "Chưa có lượt ghi nhận phù hợp với bộ lọc hiện tại.";

    } else if (currentEmotionFilter === "all") {

        const highestEmotion = Object.keys(stats).reduce((a, b) => {

            return stats[a] >= stats[b] ? a : b;

        });

        const highestConfig = emotionConfig[highestEmotion];

        messageElement.textContent =
            `Khu vực đang có ${total} lượt ghi nhận cảm xúc. ` +
            `${highestConfig.icon} Cảm xúc được ghi nhận nhiều nhất là ${highestConfig.label.toLowerCase()}.`;

    } else {

        const config = emotionConfig[currentEmotionFilter];

        messageElement.textContent =
            `Đang hiển thị ${total} lượt ghi nhận thuộc trạng thái ${config.label.toLowerCase()}.`;

    }

    statsElement.innerHTML = "";

    Object.keys(emotionConfig).forEach(emotion => {

        // Khi lọc một cảm xúc, chỉ hiển thị cảm xúc đó.

        if (
            currentEmotionFilter !== "all" &&
            currentEmotionFilter !== emotion
        ) {
            return;
        }

        const config = emotionConfig[emotion];

        const item = document.createElement("div");

        item.className = "empathy-stat-item";

        item.style.setProperty(
            "--stat-color",
            config.color
        );

        item.innerHTML = `

            <span class="empathy-stat-icon">
                ${config.icon}
            </span>

            <span class="empathy-stat-label">
                ${config.label}
            </span>

            <strong class="empathy-stat-count">
                ${stats[emotion].toLocaleString("vi-VN")}
            </strong>

            <span class="empathy-stat-unit">
                lượt ghi nhận
            </span>

        `;

        statsElement.appendChild(item);

    });

}


// ==========================================
// 11. KHỞI TẠO LAYER
// ==========================================

// Layer chứa marker cảm xúc.
// Sử dụng layerGroup thay vì markerClusterGroup.
// Mỗi marker được hiển thị độc lập.

const moodLayer = L.layerGroup();


// Layer Heatmap.

let heatLayer = null;


// Layer vị trí người dùng.

const locationLayer = L.layerGroup().addTo(map);


// Chế độ hiện tại.

let currentMode = "heatmap";


// ==========================================
// 12. CHUẨN BỊ DỮ LIỆU HEATMAP
// ==========================================

function prepareHeatData() {

    return getFilteredEmotionData().map(item => {

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


// ==========================================
// 13. TẠO HEATMAP
// ==========================================

function createHeatmap() {

    const heatData = prepareHeatData();

    heatLayer = L.heatLayer(heatData, {

        radius: HEAT_RADIUS,

        blur: HEAT_BLUR,

        max: 1,

        maxZoom: 17,

        minOpacity: 0.3,

        gradient: heatGradient

    });

}


// ==========================================
// 14. CẬP NHẬT HEATMAP
// ==========================================

function updateHeatmap() {

    const heatData = prepareHeatData();

    if (heatLayer === null) {

        createHeatmap();

    } else {

        heatLayer.setLatLngs(heatData);

    }

}


// ==========================================
// 15. KÍCH THƯỚC ICON THEO ZOOM
// ==========================================

function getIconSize(zoom) {

    if (zoom <= 13) return 18;

    if (zoom <= 15) return 24;

    if (zoom <= 17) return 30;

    return 36;

}


// ==========================================
// 16. TẠO ICON CẢM XÚC
// ==========================================

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


// ==========================================
// 17. TẠO CÁC MARKER CẢM XÚC
// ==========================================

function renderMoodPins() {

    // Xóa marker cũ trước khi tạo lại.

    moodLayer.clearLayers();

    const zoom = map.getZoom();

    const size = getIconSize(zoom);

    getFilteredEmotionData().forEach(item => {

        const config = emotionConfig[item.emotion];

        if (!config) {
            return;
        }

        const icon = createMoodIcon(item, size);

        if (!icon) {
            return;
        }

        // Mỗi địa điểm tạo một marker riêng.

        const marker = L.marker(
            [item.lat, item.lng],
            {
                icon: icon
            }
        );

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


// ==========================================
// 18. XÓA CÁC LAYER CẢM XÚC
// ==========================================

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


// ==========================================
// 19. CẬP NHẬT NÚT ACTIVE
// ==========================================

function updateActiveButton(activeId) {

    document.querySelectorAll(".control-btn").forEach(button => {

        button.classList.remove("active");

    });

    const activeButton = document.getElementById(activeId);

    if (activeButton) {

        activeButton.classList.add("active");

    }

}


// ==========================================
// 20. CHẾ ĐỘ PINS
// ==========================================

function showMoodPins() {

    currentMode = "pins";

    removeEmotionLayers();

    renderMoodPins();

    moodLayer.addTo(map);

    updateActiveButton("showPins");

}


// ==========================================
// 21. CHẾ ĐỘ HEATMAP
// ==========================================

function showHeatmap() {

    currentMode = "heatmap";

    removeEmotionLayers();

    updateHeatmap();

    heatLayer.addTo(map);

    updateActiveButton("showHeatmap");

}


// ==========================================
// 22. CHẾ ĐỘ BOTH
// ==========================================

function showBoth() {

    currentMode = "both";

    removeEmotionLayers();

    // Heatmap nằm dưới marker.

    updateHeatmap();

    heatLayer.addTo(map);

    renderMoodPins();

    moodLayer.addTo(map);

    updateActiveButton("showBoth");

}


// ==========================================
// 23. CẬP NHẬT CHẾ ĐỘ HIỆN TẠI
// ==========================================

function refreshCurrentMode() {

    // Cập nhật thống kê.

    updateEmpathyStats();

    // Cập nhật bản đồ theo chế độ hiện tại.

    if (currentMode === "pins") {

        showMoodPins();

    } else if (currentMode === "heatmap") {

        showHeatmap();

    } else if (currentMode === "both") {

        showBoth();

    }

}


// ==========================================
// 24. TÍNH KHOẢNG CÁCH HAI ĐIỂM
// ==========================================

// Công thức Haversine.
// Kết quả trả về đơn vị mét.

function calculateDistance(lat1, lng1, lat2, lng2) {

    const R = 6371000;

    const toRad = value => value * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);

    const dLng = toRad(lng2 - lng1);

    const a =

        Math.sin(dLat / 2) ** 2 +

        Math.cos(toRad(lat1)) *

        Math.cos(toRad(lat2)) *

        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return R * c;

}


// ==========================================
// 25. ĐÓNG BẢNG THỐNG KÊ QUANH VỊ TRÍ
// ==========================================

const nearbyPanel = document.getElementById("nearbyEmotionPanel");

const closeNearbyButton = document.getElementById("closeNearbyPanel");

if (closeNearbyButton && nearbyPanel) {

    closeNearbyButton.addEventListener("click", function() {

        nearbyPanel.style.display = "none";

    });

}


// ==========================================
// 26. THỐNG KÊ CẢM XÚC QUANH NGƯỜI DÙNG
// ==========================================

function showNearbyEmotions(userLat, userLng) {

    const panel = document.getElementById("nearbyEmotionPanel");

    if (!panel) {
        return;
    }

    const nearbyData = getFilteredEmotionData().filter(item => {

        const distance = calculateDistance(

            userLat,

            userLng,

            item.lat,

            item.lng

        );

        return distance <= NEARBY_RADIUS;

    });

    const stats = calculateEmotionStats(nearbyData);

    const total = Object.values(stats).reduce(
        (sum, value) => sum + value,
        0
    );

    document.getElementById("nearbyTotal").textContent =
        total.toLocaleString("vi-VN");

    document.getElementById("nearbyRadiusText").textContent =
        "Trong bán kính 1.500 m";

    const message = document.getElementById("nearbyMessage");

    const list = document.getElementById("nearbyEmotionList");

    list.innerHTML = "";

    if (total === 0) {

        message.textContent =
            "Chưa có lượt ghi nhận cảm xúc trong phạm vi này.";

    } else {

        const highestEmotion = Object.keys(stats).reduce((a, b) => {

            return stats[a] >= stats[b] ? a : b;

        });

        const config = emotionConfig[highestEmotion];

        message.textContent =
            `${config.icon} Cảm xúc được ghi nhận nhiều nhất quanh bạn là ${config.label.toLowerCase()}.`;

    }

    Object.keys(emotionConfig).forEach(emotion => {

        // Khi đang lọc một cảm xúc,
        // chỉ hiển thị cảm xúc được chọn.

        if (
            currentEmotionFilter !== "all" &&
            currentEmotionFilter !== emotion
        ) {
            return;
        }

        const config = emotionConfig[emotion];

        const item = document.createElement("div");

        item.className = "nearby-emotion-item";

        item.innerHTML = `

            <span class="nearby-emotion-icon">
                ${config.icon}
            </span>

            <span class="nearby-emotion-name">
                ${config.label}
            </span>

            <strong class="nearby-emotion-count">
                ${stats[emotion].toLocaleString("vi-VN")}
            </strong>

        `;

        list.appendChild(item);

    });

    panel.style.display = "block";

}


// ==========================================
// 27. ĐỊNH VỊ NGƯỜI DÙNG
// ==========================================

let userMarker = null;

let accuracyCircle = null;

let nearbyRadiusCircle = null;


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

            // Xóa vị trí và vòng tròn cũ.

            locationLayer.clearLayers();


            // Icon vị trí người dùng.

            const userIcon = L.divIcon({

                className: "",

                html: `
                    <div class="my-location"></div>
                `,

                iconSize: [18, 18],

                iconAnchor: [9, 9]

            });


            // Marker vị trí người dùng.

            userMarker = L.marker(

                [lat, lng],

                {
                    icon: userIcon
                }

            ).addTo(locationLayer);


            userMarker.bindPopup(
                "📍 Vị trí hiện tại của bạn"
            );


            // Vòng tròn độ chính xác GPS.

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


            // Vòng tròn thống kê bán kính 1.500 m.

            nearbyRadiusCircle = L.circle(

                [lat, lng],

                {

                    radius: NEARBY_RADIUS,

                    color: "#2563eb",

                    fillColor: "#3b82f6",

                    fillOpacity: 0.04,

                    weight: 2,

                    dashArray: "8, 8"

                }

            ).addTo(locationLayer);


            // Di chuyển bản đồ tới vị trí người dùng.

            map.flyTo(

                [lat, lng],

                15,

                {
                    duration: 1.5
                }

            );


            // Cập nhật thống kê cảm xúc xung quanh.

            showNearbyEmotions(lat, lng);

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


// ==========================================
// 28. XỬ LÝ SỰ KIỆN ZOOM
// ==========================================

// Không gom marker thành cụm.
// Khi zoom, chỉ cập nhật kích thước icon.

map.on("zoomend", function() {

    if (currentMode === "pins" || currentMode === "both") {

        renderMoodPins();

    }

});


// ==========================================
// 29. GẮN SỰ KIỆN CHO BỘ LỌC
// ==========================================

const emotionFilter = document.getElementById("emotionFilter");

if (emotionFilter) {

    emotionFilter.addEventListener("change", function(event) {

        currentEmotionFilter = event.target.value;

        refreshCurrentMode();

        // Nếu bảng thống kê quanh người dùng đang mở,
        // cập nhật lại theo bộ lọc mới.

        if (
            nearbyPanel &&
            nearbyPanel.style.display !== "none" &&
            userMarker
        ) {

            const userPosition = userMarker.getLatLng();

            showNearbyEmotions(
                userPosition.lat,
                userPosition.lng
            );

        }

    });

}


// ==========================================
// 30. GẮN SỰ KIỆN CHO CÁC NÚT
// ==========================================

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


// ==========================================
// 31. KHỞI CHẠY DỰ ÁN
// ==========================================

// Mặc định hiển thị Heatmap.

showHeatmap();

// Hiển thị thống kê ban đầu.

updateEmpathyStats();

console.log("Regional Emotion Map đã khởi chạy!");
