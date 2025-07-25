import { Animated, FlatList, Dimensions, StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen');

const data = [
    require('../assests/images/4.jpg'),
    require('../assests/images/6.jpg'),
    require('../assests/images/9.jpg'),
    require('../assests/images/10.jpg'),
    require('../assests/images/11.jpg'),
    require('../assests/images/12.jpg'),
    require('../assests/images/13.jpg'),
    require('../assests/images/16.jpg'),
    require('../assests/images/17.png'),
    require('../assests/images/c18.png'),
    require('../assests/images/slogo.png'),

];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const ImagePlay = () => {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: '#000', }}>

            <StatusBar hidden />

            <View style={StyleSheet.absoluteFillObject}>
                {data.map((image, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.Image
                            key={`bg-${index}`}
                            source={image}
                            style={{
                                position: 'absolute',
                                width: width,
                                height: height,
                                top: 0,
                                left: 0,
                                opacity: opacity,
                            }}
                            blurRadius={3}
                            resizeMode="cover"
                        />
                    );
                })}
            </View>
            <Animated.FlatList
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={item} style={styles.image} resizeMode='cover' />
                    </View>
                )}
            />
        </View>
    )
}

export default ImagePlay

const styles = StyleSheet.create({
    image: {
        width: imageW,
        height: imageH,
        
    },
    imageContainer: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});