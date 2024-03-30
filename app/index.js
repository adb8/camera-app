import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import styles from "../styles/styles";

const CameraPage = () => {
    const router = useRouter();
    const [type, setType] = useState(CameraType.back);
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const isMountedRef = useRef(null);
    const cameraDelay = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        cameraDelay.current = false;
        return () => (isMountedRef.current = false);
    }, []);

    if (!cameraPermission) {
        return <View />;
    }

    if (!cameraPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestCameraPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraDelay.current) {
            return;
        }
        cameraDelay.current = true;
        try {
            if (cameraRef.current && isMountedRef.current) {
                const { uri } = await cameraRef.current.takePictureAsync();
                const asset = await MediaLibrary.createAssetAsync(uri);
                console.log(asset);
                cameraDelay.current = false;
            }
        } catch (error) {
            console.error(error);
            cameraDelay.current = false;
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <Camera
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                }}
                type={type}
                ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType((current) =>
                                current === CameraType.back ? CameraType.front : CameraType.back
                            );
                        }}>
                        <Text style={styles.whiteText}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.whiteText}>Capture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            router.push("/gallery");
                        }}>
                        <Text style={styles.whiteText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    );
};

export default CameraPage;
