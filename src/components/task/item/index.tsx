import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, TextInput, Text } from 'react-native';
import { TaskItemProps } from '../../../interfaces/screens/task.interface';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from '../../../constants/colors.constant';
import { defaultList } from '../../../constants/task.constant';
import { FontAwesome } from '@expo/vector-icons';

const TaskItens: React.FC<TaskItemProps> = ({ index, item, itens, setItens, textInputRefs }) => {

    return (
        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            {item.type == 'check' && (
                <BouncyCheckbox
                    isChecked={item.checked}
                    text=""
                    disableBuiltInState
                    onPress={() => {
                        const updatedItens = [...itens];
                        updatedItens[index].checked = !item.checked;
                        setItens(updatedItens);
                    }}
                    fillColor={BUTTON_PRIMARY}
                />
            )}

            {item.type == 'list' && (
                <View style={{ width: 20, height: 20, marginRight: 20, marginLeft: 8, alignItems: "center", justifyContent: "center" }}>
                    <FontAwesome name="circle" size={16} color={BUTTON_PRIMARY} />
                </View>
            )}

            {item.type == 'list-ol' && (
                <Text style={{ marginRight: 20, marginLeft: 8, color: BUTTON_PRIMARY, width: 20, height: 20, textAlign: "center" }}>
                    {index + 1}.
                </Text>
            )}

            <TextInput
                ref={(ref) => {
                    textInputRefs.current[index] = ref;
                }}
                placeholder='Escreva sua tarefa'
                value={item.title}
                placeholderTextColor='#969696'
                style={{ color: TEXT_PRIMARY, width: "100%" }}
                onChangeText={(text) => {
                    const updatedItens = [...itens];
                    updatedItens[index] = { ...updatedItens[index], title: text };
                    setItens(updatedItens);
                }}
                onSubmitEditing={() => {
                    const itensMap = itens.map(i => i);
                    if (!item?.title?.length) return

                    if ((itens.length - 1) == index) {
                        itensMap.push({ ...defaultList, type: item.type })
                        setItens(itensMap)
                    } else {
                        itensMap.splice(index + 1, 0, { ...defaultList, type: item.type });
                        setItens(itensMap);
                    }

                    setTimeout(() => {
                        if (textInputRefs.current[index + 1]) {
                            textInputRefs.current[index + 1]?.focus();
                        }
                    }, 10);
                }}
            />
        </View>
    );
}

export default TaskItens;