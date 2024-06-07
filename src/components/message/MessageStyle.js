import { StyleSheet } from "react-native";

const MessageStyle = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#fff",
        elevation: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10
    },
    name:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
    },
    message: {
        fontSize: 14,
        color: '#000'
    }
})


export default MessageStyle;