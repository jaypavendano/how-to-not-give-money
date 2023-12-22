import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

interface PrizeProps {
  visible: boolean;
  onClose: () => void;
  prizedWin: number;
}

export const Prize = ({ visible, onClose, prizedWin = 20 }: PrizeProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose();
        }}
      >
        <View style={styles.centeredView}>
          <View>
            <Text style={styles.modalText}>You win {prizedWin} PESOS!</Text>

            {prizedWin === 20 && (
              <Image
                style={{
                  width: 350,
                  resizeMode: 'contain',
                }}
                source={require('./assets/20.png')}
              />
            )}
            {prizedWin === 50 && (
              <Image
                style={{
                  width: 350,
                  resizeMode: 'contain',
                }}
                source={require('./assets/50.png')}
              />
            )}
            {prizedWin === 100 && (
              <Image
                style={{
                  width: 350,
                  resizeMode: 'contain',
                }}
                source={require('./assets/100.png')}
              />
            )}

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose()}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 24,
  },
});
