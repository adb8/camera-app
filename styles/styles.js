import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        margin: 10,
    },
    blackText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    whiteText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
    },
    albumAssetsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default styles;