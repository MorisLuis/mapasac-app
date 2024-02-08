import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ImagePickerResponse, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';

const ImageGallery: React.FC = () => {
    const [barcodeData, setBarcodeData] = useState<string | null>(null);

    const openImagePicker = () => {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                maxWidth: 800,
                maxHeight: 600,
            };

            launchImageLibrary(options, (response: ImagePickerResponse) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response) {
                    console.log('ImagePicker Error: ', response);
                } else {
                    // Procesar la imagen y actualizar el estado con los datos del código de barras si es necesario
                    setBarcodeData('Código de barras procesado: ' + response);
                }
            });
    };

    return (
        <View>

            <RNCamera
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            >
            </RNCamera>

            <TouchableOpacity onPress={openImagePicker}>
                <Text>Seleccionar imagen de galería</Text>
            </TouchableOpacity>

            {barcodeData && (
                <View>
                    <Text>{barcodeData}</Text>
                </View>
            )}
        </View>
    );
};
export default ImageGallery;


const styles = StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: "beige",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flex: 1,
        width: "100%",
        height: "100%",
        borderEndEndRadius: 20,
        borderEndStartRadius: 20,
        overflow: "hidden"
    },
    camera: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0
    },
    iconStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -75 }, { translateY: -150 }]
    } as ViewStyle,
    bagContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "absolute",
        top: 20,
        right: 0,
        paddingHorizontal: 10,
    },
    bag: {
        backgroundColor: "gray",
        width: 35,
        height: 35,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1
    },
    bagNumber: {
        color: "white"
    },
    scannerOptions: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: [{ translateX: -65 }],
        backgroundColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 15
    },
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    }

})


