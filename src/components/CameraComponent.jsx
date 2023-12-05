import React, { useEffect } from 'react';

const CameraComponent = ({ isCameraOn, videoRef }) => {
    useEffect(() => {
        const constraints = { video: true };

        async function enableStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        }

        async function disableStream() {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }

        if (isCameraOn) {
            enableStream();
        } else {
            disableStream();
        }

        return () => {
            disableStream();
        };
    }, [isCameraOn, videoRef]);

    return (
        <div className="w-full h-full rounded-full overflow-hidden">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        </div>
    );
};

export default CameraComponent;
