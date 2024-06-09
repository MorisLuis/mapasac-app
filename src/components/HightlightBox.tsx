import { View } from "react-native";

export const HightlightBox = ({highlight, layout, scanFrame}: any): JSX.Element => {
    return (
        <View
            style={[
                {
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: 'red',
                },
                {
                    right: highlight.x * (layout.width / scanFrame.height),
                    top: highlight.y * (layout.height / scanFrame.width),
                    height: highlight.height * (layout.width / scanFrame.height),
                    width: highlight.width * (layout.height / scanFrame.width),
                },
            ]}
        />
    );
};