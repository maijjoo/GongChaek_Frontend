import { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import SlrModalLayout from "../../layouts/SlrModalLayout";
import Button from "../../components/commons/Button";

// ISBN 스캔 카메라 모달
const ISBNScanner2 = ({
  onSwitchToCapture,
  onCloseScannner,
  onSuccessScan,
}) => {
  const [error, setError] = useState(null);
  const scannerId = "isbn-scanner";

  useEffect(() => {
    const scannerId = "isbn-scanner";
    const html5QrCode = new Html5Qrcode(scannerId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // 후면 카메라 찾기
          const backCamera = devices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear")
          );

          const selectedCameraId = backCamera ? backCamera.id : devices[0].id; // 없으면 첫 번째 카메라라도

          const constraints = {
            deviceId: { exact: selectedCameraId },
          };

          html5QrCode.start(
            constraints,
            {
              fps: 15,
              qrbox: { width: 300, height: 400 },
              formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
              experimentalFeatures: {
                useBarCodeDetectorIfSupported: false, // << 이걸 false로 강제
              },
            },
            (decodedText) => {
              console.log("스캔 성공:", decodedText);
              html5QrCode.stop();
              onSuccessScan(decodedText);
            },
            (errorMessage) => {
              console.warn("스캔 실패:", errorMessage);
            }
          );
        } else {
          console.error("카메라를 찾을 수 없습니다.");
        }
      })
      .catch((err) => {
        console.error("카메라 접근 실패:", err);
      });

    return () => {
      html5QrCode.stop().catch((err) => console.warn("카메라 중지 실패:", err));
    };
  }, []);

  const isValidISBN = (code) => {
    const cleanCode = code.replace(/[^0-9X]/g, "");
    return (
      /^(978|979)\d{10}$/.test(cleanCode) || /^\d{9}[\dX]$/.test(cleanCode)
    );
  };

  return (
    <SlrModalLayout size={""} onClose={onCloseScannner}>
      <div className="flex w-full h-full flex-col justify-start items-center">
        <div className="flex w-full h-80 flex-col justify-start items-center gap-auto">
          {/* 상단 제목 */}
          <h2 className="text-xl font-bold mb-4">ISBN 스캔</h2>

          {/* 스캔 컨테이너 */}
          <div
            id={scannerId}
            className="relative w-full h-80 bg-white overflow-hidden mb-4"
            style={{ width: "100%" }}
          >
            {/* 비디오 요소 스타일 강제 적용 */}
            <style>
              {`
          #${scannerId} video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%; /* 컨테이너 너비 채움 */
            height: 100%; /* 컨테이너 높이 채움 */
            object-fit: cover; /* 화면 비율 유지하며 채우기 */
          }
        `}
            </style>
          </div>
          {/* 안내 메시지 */}
          {error ? (
            <p className="text-undred text-center">{error}</p>
          ) : (
            <p className="text-undpoint text-und16 font-bold">
              기기에 따라 스캔 인식률이 낮을 수 있습니다
              <br />
              직접 촬영 모드로 전환하여 재시도해 주세요
            </p>
          )}
        </div>

        {/* 버튼 */}
        <Button
          onClick={onSwitchToCapture}
          color="undpoint"
          className="h-12 rounded-3xl fixed bottom-8 left-6 right-6 text-und18 font-bold"
        >
          직접 촬영하기
        </Button>
      </div>
    </SlrModalLayout>
  );
};

export default ISBNScanner2;
