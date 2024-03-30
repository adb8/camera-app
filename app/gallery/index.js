import { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Dimensions,
    SafeAreaView,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import styles from "../../styles/styles";

const { width } = Dimensions.get("window");

const Gallery = () => {
    const router = useRouter();
    const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        async function getAlbums() {
            try {
                if (galleryPermission && galleryPermission.status !== "granted") {
                    await requestGalleryPermission();
                }
                const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
                    includeSmartAlbums: true,
                });
                setAlbums(fetchedAlbums);
                console.log(fetchedAlbums);
            } catch (error) {
                console.log(error);
            }
        }
        getAlbums();
    }, [galleryPermission]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <ScrollView>
                {albums && albums.length > 0 && <AlbumEntry album={albums[0]} />}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.push("/");
                    }}>
                    <Text style={[styles.blackText]}>Back to Camera</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const AlbumEntry = ({ album }) => {
    const router = useRouter();
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function getAlbumAssets() {
            const albumAssets = await MediaLibrary.getAssetsAsync({ album });
            setAssets(albumAssets.assets);
        }
        getAlbumAssets();
    }, [album]);

    return (
        <View key={album.id} style={styles.albumContainer}>
            <View style={styles.albumAssetsContainer}>
                {assets &&
                    assets.map((asset, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                console.log(asset);
                                const concatenatedURI = `${asset.uri}+${asset.id}`;
                                const encodedURI = encodeURIComponent(concatenatedURI);
                                router.push(`/picture/${encodedURI}`);
                            }}>
                            <Image
                                source={{ uri: asset.uri }}
                                width={width / 3}
                                height={width / 3}
                            />
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );
};

export default Gallery;
