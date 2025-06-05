import { useEffect, useState, useRef } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import SlrModalLayout from "../../layouts/SlrModalLayout";
import Button from "../../components/commons/Button";

// ISBN 스캔 카메라 모달
const ISBNScanner = ({ onSwitchToCapture, onCloseScannner, onSuccessScan }) => {
  const [error, setError] = useState(null);
  const scannerId = "isbn-scanner";
  const readerRef = useRef(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [focusDistance, setFocusDistance] = useState(0.5);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    readerRef.current = codeReader;

    codeReader
      .decodeFromVideoDevice(
        null,
        scannerId,
        (result, error, controls) => {
          if (result) {
            const code = result.getText();
            if (isValidISBN(code)) {
              console.log("스캔 성공 : ", code);
              controls.stop();
              onSuccessScan(code);
            }
          }
        },
        {
          formats: [BarcodeFormat.EAN_13],
          videoConstraints: {
            facingMode: "environment",
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            advanced: [{ focusMode: "continuous" }, { focusDistance: 0.0 }],
          },
        }
      )
      .then(() => {
        const video = document.getElementById(scannerId);
        const stream = video?.srcObject;
        if (stream) {
          mediaStreamRef.current = stream;
          console.log("🎥 MediaStream 저장됨", stream);
        } else {
          console.warn("⚠️ srcObject가 아직 연결되지 않았습니다.");
        }
      })
      .catch((err) => {
        console.error("카메라 접근 실패: ", err);
        setError("카메라 접근에 실패했습니다.");
      });

    return () => {
      const video = document.getElementById(scannerId);
      const stream = video?.srcObject;
      if (stream && typeof stream.getTracks === "function") {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const isValidISBN = (code) => {
    const cleanCode = code.replace(/[^0-9X]/g, "");
    return (
      /^(978|979)\d{10}$/.test(cleanCode) || /^\d{9}[\dX]$/.test(cleanCode)
    );
  };

  const applyVideoSettings = (track, settings) => {
    if (!track) {
      console.error("❌ track이 없습니다.");
      return;
    }

    if (!track.applyConstraints) {
      console.error("❌ applyConstraints 지원 안 함");
      return;
    }

    const constraints = { advanced: [] };
    Object.entries(settings).forEach(([key, value]) => {
      constraints.advanced.push({ [key]: value });
    });

    console.log("📤 적용 시도할 constraints:", constraints);

    const caps = track.getCapabilities?.();
    const settingss = track.getSettings?.();
    console.log("🧩 capabilities:", caps);
    console.log("🔧 settings:", settingss);

    track
      .applyConstraints(constraints)
      .then(() => console.log("✅ 설정 적용 성공:", settings))
      .catch((err) => console.warn("⚠️ 설정 적용 실패:", err));
  };

  const adjustFocus = (value) => {
    setFocusDistance(value);
    const track = mediaStreamRef.current?.getVideoTracks?.()[0];
    if (track) {
      applyVideoSettings(track, { focusMode: "manual", focusDistance: value });
    }
  };

  const adjustZoom = (value) => {
    setZoomLevel(value);
    const track = mediaStreamRef.current?.getVideoTracks?.()[0];
    if (track) {
      applyVideoSettings(track, { zoom: value });
    }
  };

  const toggleTorch = () => {
    const newState = !isTorchOn;
    setIsTorchOn(newState);
    const track = mediaStreamRef.current?.getVideoTracks?.()[0];
    if (track) {
      applyVideoSettings(track, { torch: newState });
    }
  };

  return (
    <SlrModalLayout size={"large"} onClose={onCloseScannner}>
      <div className="flex w-full h-full flex-col justify-start items-center">
        <div className="flex w-full h-80 flex-col justify-start items-center gap-auto">
          {/* 상단 제목 */}
          <h2 className="text-xl font-bold mb-4">ISBN 스캔</h2>

          {/* 스캔 컨테이너 */}
          <div
            id="scanner-container"
            className="w-full flex flex-col items-center bg-white" // 배경 흰색 설정
            style={{
              backgroundColor: "#ffffff", // 스캔 구역 배경
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 0 16px rgba(0,0,0,0.1)",
            }}
          >
            <video
              id={scannerId}
              className="w-full h-80 object-cover rounded"
              muted
              playsInline
              style={{
                backgroundColor: "#ffffff", // 비디오 요소 뒷배경도 흰색
              }}
            />

            <p className="text-sm text-gray-600 mt-2 text-center">
              📸 책을 밝은 곳에서 스캔해 주세요.
              <br />
              흐릴 경우 화면을 터치하거나, 카메라와 책의 거리를 조절해 보세요.
            </p>

            <div className="w-full max-w-md p-4 space-y-4">
              {/* 초점 거리 슬라이더 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  초점 거리: {focusDistance.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.27"
                  step="0.01"
                  value={focusDistance}
                  onChange={(e) => adjustFocus(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 줌 슬라이더 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  줌: {zoomLevel.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => adjustZoom(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 플래시 토글 */}
              <button
                onClick={toggleTorch}
                className="w-full py-2 px-4 rounded bg-undpoint text-white font-bold"
              >
                {isTorchOn ? "플래시 끄기" : "플래시 켜기"}
              </button>
            </div>
          </div>

          {/* 안내 메시지 */}
          {error ? (
            <p className="text-undred text-center">{error}</p>
          ) : (
            <p className="text-undpoint text-und16 font-bold">
              책을 가까이 들이대고, 초점이 안 맞으면 화면을 터치해 주세요
            </p>
          )}
        </div>

        {/* 직접 촬영하기 버튼 */}
        {/* <Button
          onClick={onSwitchToCapture}
          color="undpoint"
          className="h-12 rounded-3xl fixed bottom-8 left-6 right-6 text-und18 font-bold"
        >
          직접 촬영하기
        </Button> */}
      </div>
    </SlrModalLayout>
  );
};

export default ISBNScanner;
