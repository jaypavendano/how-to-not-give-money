import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card';
import { Prize } from './Prize';

export default function App() {
  const [gridValues, setGridValues] = useState<number[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isCheatOn, setIsCheatOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [prized, setPrized] = useState(0);
  const [isFlipped, setIsFlipped] = useState(new Array(12).fill(false));

  const generateGridValues = (): number[] => {
    const values: number[] = [];
    const countMap: { [key: number]: number } = {
      20: 3,
      50: 3,
      100: 4,
      500: 2,
    };

    for (let i = 0; i < 12; i++) {
      let cellValue: number;
      const possibleValues = Object.keys(countMap).filter(
        (key) => countMap[Number(key)] > 0
      );

      cellValue = Number(
        possibleValues[Math.floor(Math.random() * possibleValues.length)]
      );
      countMap[cellValue]--;

      values.push(cellValue);
    }
    return values;
  };

  const shuffleGrid = () => {
    const randomizedValues = generateGridValues();
    setGridValues(randomizedValues);
    setIsClicked(false);
    setIsFlipped(new Array(12).fill(false));
  };

  useEffect(() => {
    shuffleGrid();
  }, []);

  const handleCardFlip = (value: number, indexVal: number) => {
    if (value !== 20 && !isClicked) {
      const updateVal = [...gridValues];
      const twenty = gridValues.indexOf(20);
      updateVal[twenty] = value;
      updateVal[indexVal] = 20;
      setGridValues(updateVal);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setIsFlipped(new Array(12).fill(true));
          }}
          activeOpacity={0.5}
        >
          <Ionicons name="ios-eye-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={shuffleGrid} activeOpacity={0.5}>
          <Ionicons name="md-reload" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {gridValues.map((item, i) => (
          <View style={styles.box} key={i}>
            <FlipCard friction={200} flip={isFlipped[i]}>
              <Pressable
                onPress={() => {
                  const updatedIsFlipped = [...isFlipped];
                  updatedIsFlipped[i] = true;
                  setIsFlipped(updatedIsFlipped);
                  if (isCheatOn) {
                    handleCardFlip(item, i);
                  }
                  if (!isClicked) {
                    setPrized(isCheatOn ? 20 : item);
                    setModalVisible(true);
                  }
                  setIsClicked(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 150,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>Card </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  const updatedIsFlipped = [...isFlipped];
                  updatedIsFlipped[i] = false;
                  setIsFlipped(updatedIsFlipped);
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 150,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{item}</Text>
                </View>
              </Pressable>
            </FlipCard>
          </View>
        ))}
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 50 }}>
        <Pressable onPress={() => setIsCheatOn(!isCheatOn)}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Made by jaypavendano{isCheatOn ? '.' : ''}
          </Text>
        </Pressable>
      </View>
      <Prize
        visible={modalVisible}
        onClose={handleModalClose}
        prizedWin={prized}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#C6232F',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    // backgroundColor: 'white',
    height: 150,
    width: '32%',
    marginBottom: 8,
    borderRadius: 5,
  },
});
