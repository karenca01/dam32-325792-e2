import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const App = () => {

  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Juan comentó tu publicación en el grupo de comerciantes unidos", leida: false },
    { id: 2, mensaje: "Ana le dio like a tu foto", leida: false },
    { id: 3, mensaje: "Tienes una nueva solicitud", leida: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificaciones((prev) => {
        const nueva = {
          id: Date.now(),
          mensaje: `Nueva notificación #${prev.length + 1}`,
          leida: false
        };
        return [nueva, ...prev];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const noLeidas = notificaciones.filter(n => !n.leida).length;

  const marcarComoLeida = (id) => {
    const nuevas = notificaciones.map(n =>
      n.id === id ? { ...n, leida: true } : n
    );
    setNotificaciones(nuevas);
  };

  const marcarTodas = () => {
    const nuevas = notificaciones.map(n => ({ ...n, leida: true }));
    setNotificaciones(nuevas);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titulo}>facebook</Text>
        <Text style={styles.contador}>{noLeidas}</Text>
      </View>

      <View style={styles.boton}>
        <Button title="Marcar todas como leídas" onPress={marcarTodas} />
      </View>

      <ScrollView>
        {notificaciones.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => marcarComoLeida(item.id)}
          >
            <View style={[
              styles.card,
              !item.leida && styles.noLeida
            ]}>
              <Text style={styles.texto}>{item.mensaje}</Text>
              <Text style={styles.estado}>
                {item.leida ? "Leída" : "No leída"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: 40
  },
  header: {
    height: '10%',
    // backgroundColor: '#d0d0d0ff',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0ff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titulo: {
    color: '#1877f2',
    fontSize: 35,
    fontWeight: 'bold'
  },
  contador: {
    backgroundColor: 'white',
    color: '#1877f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontWeight: 'bold'
  },
  boton: {
    margin: 10
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  noLeida: {
    backgroundColor: '#e7f3ff'
  },
  texto: {
    fontSize: 16
  }
});