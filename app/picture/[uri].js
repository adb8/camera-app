import {
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import styles from "../../styles/styles";

const { width, height } = Dimensions.get("window");

const Picture = () => {
    const router = useRouter();
    const { uri } = useLocalSearchParams();
    const [assetUri, assetId] = decodeURIComponent(uri).split("+");

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <ScrollView>
                <Image
                    source={{
                        uri: assetUri,
                    }}
                    width={width}
                    height={height}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.push("/gallery");
                    }}>
                    <Text style={styles.blackText}>Back to Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        const deleteAsset = async () => {
                            try {
                                await MediaLibrary.deleteAssetsAsync([assetId]);
                                router.push("/gallery");
                            } catch (error) {
                                console.error(error);
                                router.push("/gallery");
                            }
                        };
                        deleteAsset();
                    }}>
                    <Text style={styles.blackText}>Delete Photo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Picture;
