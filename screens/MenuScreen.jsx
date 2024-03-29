import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const MenuScreen = () => {
  const route = useRoute();
  const [item, setItem] = useState('');
  const [option, setOption] = useState('');
  const [type, setType] = useState('');
  const [menuItems, setMenuItems] = useState([]);


  const navigation = useNavigation();
  useEffect(() => {
    if (route?.params?.items) {
      setMenuItems(route?.params?.items);
    }
  }, [route?.params?.items]);

  const addDishToMenu = async () => {
    setItem('');
    const dish = {
      date: route?.params.date,
      name: item,
      type: type,
      mealType: option,
    };

    const response = await axios.post(
      'http://localhost:8000/menu/addDish',
      dish,
    );
    console.log('dish added', response);

    const updatedMenuItems = [...menuItems, dish];
    setMenuItems(updatedMenuItems);

    console.log('dish added', response);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#4B9CD3',
        }}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{flex: 1,}}><Text style={{ color: 'white'}}>Back</Text></TouchableOpacity>

        <View style={{flex: 1}}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            {route?.params.date}
          </Text>
        </View>

        <TouchableOpacity><Text style={{ color: 'white'}}>Delete</Text></TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setOption('Breakfast')}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == 'Breakfast' ? '#4B9CD3' : 'white',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: option == 'Breakfast' ? 'white' : 'black',
            }}>
            Breakfast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOption('Lunch')}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == 'Lunch' ? '#4B9CD3' : 'white',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: option == 'Lunch' ? 'white' : 'black',
            }}>
            Lunch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOption('Dinner')}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == 'Dinner' ? '#4B9CD3' : 'white',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: option == 'Dinner' ? 'white' : 'black',
            }}>
            Dinner
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          {
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            width: '100%',
            height: 80,
            marginVertical: 12,
          },
          menuItems && {
            height: 'auto',
          },
          !menuItems && {
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
       
        {menuItems.length > 0 ? (
          <View>
            {/* Render Breakfast section if there are items */}
            {menuItems.some(item => item.mealType === 'Breakfast') && (
              <View>
                <View
                  style={{
                    backgroundColor: '#E0E0E0',
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                    marginVertical: 5,
                    width: 100,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    Breakfast
                  </Text>
                </View>
                {/* Map over and render Breakfast items */}
                {menuItems
                  .filter(item => item.mealType === 'Breakfast')
                  .map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginVertical: 4,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#4B9CD3',
                          paddingHorizontal: 7,
                          paddingVertical: 4,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          {item?.type}
                        </Text>
                      </View>
                      <Text>{item.name}</Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Render Lunch section if there are items */}
            {menuItems.some(item => item.mealType === 'Lunch') && (
              <View>
                <View
                  style={{
                    backgroundColor: '#4B9CD3',
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                    marginVertical: 5,
                    width: 100,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    Lunch
                  </Text>
                </View>
                {/* Map over and render Lunch items */}
                {menuItems
                  .filter(item => item.mealType === 'Lunch')
                  .map((item, index) => (
                    <View
                    key={item.date + index} 
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginVertical: 4,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#4B9CD3',
                          paddingHorizontal: 7,
                          paddingVertical: 4,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          {item?.type}
                        </Text>
                      </View>
                      <Text key={index}>{item.name}</Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Render Dinner section if there are items */}
            {menuItems.some(item => item.mealType === 'Dinner') && (
              <View>
                <View
                  style={{
                    backgroundColor: '#4B9CD3',
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                    marginVertical: 5,
                    width: 100,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    Dinner
                  </Text>
                </View>
                {/* Map over and render Dinner items */}
                {menuItems
                  .filter(item => item.mealType === 'Dinner')
                  .map((item, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginVertical: 4,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#fd5c63',
                          paddingHorizontal: 7,
                          paddingVertical: 4,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          {item?.type}
                        </Text>
                      </View>
                      <Text key={index}>{item.name}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        ):(
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '600',
              color: 'gray',
            }}>
            There is no menu
          </Text>)}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => setType('Staple')}
          style={{
            backgroundColor: type == 'Staple' ? '#4B9CD3' : 'white',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}>
          <Text
            style={{fontSize: 15, color: type == 'Staple' ? 'white' : 'black'}}>
            Staple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('Main')}
          style={{
            backgroundColor: type == 'Main' ? '#4B9CD3' : 'white',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}>
          <Text
            style={{fontSize: 15, color: type == 'Main' ? 'white' : 'black'}}>
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('Side')}
          style={{
            backgroundColor: type == 'Side' ? '#4B9CD3' : 'white',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}>
          <Text
            style={{fontSize: 15, color: type == 'Side' ? 'white' : 'black'}}>
            Side
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('Soup')}
          style={{
            backgroundColor: type == 'Soup' ? '#4B9CD3' : 'white',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}>
          <Text
            style={{fontSize: 15, color: type == 'Soup' ? 'white' : 'black'}}>
            Soup
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 15,
          marginHorizontal: 10,
          flexDirection: 'row',
          gap: 10,
        }}>
        <TextInput
          value={item}
          onChangeText={text => setItem(text)}
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 6,
            flex: 1,
          }}
          placeholder="Dish name"
        />
        <TouchableOpacity
          onPress={addDishToMenu}
          style={{padding: 10, backgroundColor: '#4B9CD3', borderRadius: 6}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center',
              color: 'white',
              width: 60,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
