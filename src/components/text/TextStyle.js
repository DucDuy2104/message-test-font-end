import { StyleSheet } from "react-native";

const TextStyle = StyleSheet.create({
    myText: {
        maxWidth: 200,
        fontSize: 14,
        color: "white",
        textAlign: "left",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#3269a8",
        alignSelf:"baseline",
        marginTop: 10
    },
    yourText: {
        maxWidth: 200,
        fontSize: 14,
        color: "white",
        borderRadius: 10,
        textAlign: "left",
        padding: 10,
        alignSelf: "baseline",
        backgroundColor: "#535659",
        marginTop: 10
    },
    yourContainer: {
        width: "100%",
        alignContent: 'flex-start'
    },
    myContainer: {
        width: "100%",
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    }
})


export default TextStyle;